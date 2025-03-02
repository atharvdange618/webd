import axios from "axios";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { parse } from "node-html-parser";

// Configuration object for thresholds and logging
const config = {
  csr: {
    minimalContentLength: 200, // Minimum HTML length to consider as valid content
    minimalChildNodes: 5, // Minimum number of child nodes in <body>
    scriptCountThreshold: 10, // Threshold for number of <script> tags
    contentScriptRatio: 1000, // Minimum ratio of HTML length per script tag
    rootSelectors: ["#root", "#__next"], // Markers for typical CSR frameworks (React, Next.js)
  },
  puppeteer: {
    waitForSelectorsTimeout: 10000, // Timeout waiting for critical selectors
    gotoTimeout: 60000, // Timeout for page.goto
    waitUntil: "networkidle2", // Wait until network is idle
  },
  logging: {
    verbose: true,
  },
};

// Main crawling function
async function crawlSite(baseUrl, maxPages = 100, cfg = config, onProgress) {
  const visited = new Set();
  const queue = [baseUrl];
  const sitemapUrls = [];
  let puppeteerBrowser = null;

  console.log(process.env.CHROME_EXECUTABLE_PATH);

  try {
    while (queue.length > 0 && sitemapUrls.length < maxPages) {
      const currentUrl = queue.shift();

      // Fire the callback so the server can push an SSE update
      if (onProgress) {
        onProgress(currentUrl, sitemapUrls.length + 1);
      }

      if (visited.has(currentUrl)) continue;
      visited.add(currentUrl);

      if (cfg.logging.verbose) console.log(`Crawling: ${currentUrl}`);

      try {
        // First attempt with HTTP request
        const { links, isCSR } = await getLinksWithHTTP(
          baseUrl,
          currentUrl,
          cfg
        );

        // Hybrid approach: if HTTP returns no links but content length is high, try Puppeteer
        let finalLinks = links;
        let finalIsCSR = isCSR;
        if (!isCSR && links.length === 0) {
          if (cfg.logging.verbose)
            console.log(
              `No links extracted via HTTP; trying Puppeteer for ${currentUrl}`
            );
          finalIsCSR = true;
        }

        if (!finalIsCSR) {
          sitemapUrls.push(currentUrl);
          for (const link of finalLinks) {
            if (!visited.has(link) && !queue.includes(link)) {
              queue.push(link);
            }
          }
        } else {
          // CSR detected - fallback to Puppeteer
          if (!puppeteerBrowser) {
            const isWindows = process.platform === "win32";

            const executablePath =
              process.env.NODE_ENV === "production" || !isWindows
                ? await chromium.executablePath
                : process.env.CHROME_EXECUTABLE_PATH;

            puppeteerBrowser = await puppeteer.launch({
              args: chromium.args,
              executablePath,
              headless:
                process.env.NODE_ENV === "production" || !isWindows
                  ? chromium.headless
                  : true,
            });
          }
          const puppeteerLinks = await getLinksWithPuppeteer(
            puppeteerBrowser,
            baseUrl,
            currentUrl,
            cfg
          );
          sitemapUrls.push(currentUrl);
          for (const link of puppeteerLinks) {
            if (!visited.has(link) && !queue.includes(link)) {
              queue.push(link);
            }
          }
        }
      } catch (error) {
        console.error(`Error crawling ${currentUrl}:`, error.message);
      }
    }
  } finally {
    if (puppeteerBrowser) {
      await puppeteerBrowser.close();
    }
  }

  return sitemapUrls;
}

// HTTP request function with enhanced CSR detection
async function getLinksWithHTTP(baseUrl, currentUrl, cfg) {
  const response = await axios.get(currentUrl);
  const html = response.data;
  const root = parse(html);

  // CSR detection using the provided configuration thresholds
  const isCSR = detectCSR(html, root, cfg);

  if (!isCSR) {
    const links = extractLinks(root, baseUrl, currentUrl);
    return { links, isCSR: false };
  }
  return { links: [], isCSR: true };
}

// Puppeteer-based link extraction with enhanced wait conditions
async function getLinksWithPuppeteer(browser, baseUrl, currentUrl, cfg) {
  const page = await browser.newPage();

  try {
    await page.goto(currentUrl, {
      waitUntil: cfg.puppeteer.waitUntil,
      timeout: cfg.puppeteer.gotoTimeout,
    });

    // Wait for multiple selectors that indicate the page is loaded:
    // any <a> tag or specific root markers used by CSR frameworks
    const selectors = "a," + cfg.csr.rootSelectors.join(",");
    try {
      await page.waitForSelector(selectors, {
        timeout: cfg.puppeteer.waitForSelectorsTimeout,
      });
    } catch (e) {
      if (cfg.logging.verbose)
        console.log(
          `Timeout waiting for selectors (${selectors}) on ${currentUrl}`
        );
    }

    // Extract all links from the page
    const links = await page.evaluate((baseUrl) => {
      const linkElements = document.querySelectorAll("a[href]");
      const urls = [];
      for (const element of linkElements) {
        try {
          const href = element.getAttribute("href");
          if (!href) continue;
          const url = new URL(href, window.location.href);
          if (url.origin === baseUrl && !url.hash) {
            urls.push(url.href);
          }
        } catch {}
      }
      return [...new Set(urls)];
    }, baseUrl);

    return links;
  } finally {
    await page.close();
  }
}

// CSR detection with configurable thresholds and additional markers
function detectCSR(html, root, cfg) {
  const {
    minimalContentLength,
    minimalChildNodes,
    scriptCountThreshold,
    contentScriptRatio,
    rootSelectors,
  } = cfg.csr;

  const body = root.querySelector("body");
  const bodyChildCount = body ? body.childNodes.length : 0;

  // Basic checks
  const isShortHtml = html.length < minimalContentLength;
  const hasEmptyBody = bodyChildCount < minimalChildNodes;

  // Count <script> tags and measure ratio
  const scriptElements = root.querySelectorAll("script");
  const scriptMatches = html.match(/<script/g);
  const scriptCount = scriptElements.length;
  const ratio = html.length / (scriptMatches ? scriptMatches.length : 1);
  const hasManyScripts = scriptCount > scriptCountThreshold;
  const lowContentRatio = ratio < contentScriptRatio;

  // Check for specific root selectors (e.g. #root, #__next)
  const hasRootDiv = rootSelectors.some(
    (selector) => root.querySelector(selector) !== null
  );

  // Look for loading/spinner indicators in the raw HTML
  const hasLoadingIndicator =
    html.includes("loading") || html.includes("spinner");

  return (
    isShortHtml ||
    (hasRootDiv && (hasEmptyBody || hasLoadingIndicator)) ||
    (hasEmptyBody && hasManyScripts) ||
    (lowContentRatio && hasRootDiv)
  );
}

// Extract and normalize links from the HTML document
function extractLinks(root, baseUrl, currentUrl) {
  const links = [];
  const currentUrlObj = new URL(currentUrl);
  const baseUrlObj = new URL(baseUrl);
  const anchors = root.querySelectorAll("a");

  for (const anchor of anchors) {
    const href = anchor.getAttribute("href");
    if (!href) continue;

    try {
      // Resolve relative URLs and check for same-domain
      const url = new URL(href, currentUrl);
      if (url.hostname === baseUrlObj.hostname) {
        url.hash = ""; // Remove hash
        if (isValidUrl(url.href) && url.pathname !== currentUrlObj.pathname) {
          links.push(url.href);
        }
      }
    } catch {}
  }

  return [...new Set(links)];
}

// Validate URL based on its extension to avoid non-HTML resources
function isValidUrl(url) {
  const skipExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".pdf",
    ".zip",
    ".css",
    ".js",
    ".webp",
    ".svg",
    ".ico",
    ".mp4",
    ".mp3",
    ".avif",
  ];
  return !skipExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

// Generate an XML sitemap from the list of URLs
function generateSitemap(urls) {
  const date = new Date().toISOString();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of urls) {
    xml += "  <url>\n";
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += "  </url>\n";
  }

  xml += "</urlset>";
  return xml;
}

// Main entry point for generating the sitemap
export async function createSitemap(websiteUrl, maxPages = 100) {
  const baseUrl = new URL(websiteUrl).origin;
  const urls = await crawlSite(baseUrl, maxPages, config);
  if (config.logging.verbose) console.log(`Crawled ${urls.length} pages`);
  return generateSitemap(urls);
}
