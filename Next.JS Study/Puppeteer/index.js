import axios from "axios";
import puppeteer from "puppeteer";
import { parse } from "node-html-parser";
import { URL } from "url";

// Main crawling function
async function crawlSite(baseUrl, maxPages = 100) {
  const visited = new Set();
  const queue = [baseUrl];
  const sitemapUrls = [];
  let puppeteerBrowser = null;

  try {
    while (queue.length > 0 && sitemapUrls.length < maxPages) {
      const currentUrl = queue.shift();

      if (visited.has(currentUrl)) continue;
      visited.add(currentUrl);

      console.log(`Crawling: ${currentUrl}`);

      try {
        // First attempt with HTTP request
        const { links, isCSR } = await getLinksWithHTTP(baseUrl, currentUrl);

        if (!isCSR) {
          // Regular site - process links normally
          sitemapUrls.push(currentUrl);

          for (const link of links) {
            if (!visited.has(link) && !queue.includes(link)) {
              queue.push(link);
            }
          }
        } else {
          // CSR detected - fallback to Puppeteer
          if (!puppeteerBrowser) {
            puppeteerBrowser = await puppeteer.launch({ headless: true });
          }

          const puppeteerLinks = await getLinksWithPuppeteer(
            puppeteerBrowser,
            baseUrl,
            currentUrl
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

// HTTP request function with CSR detection
async function getLinksWithHTTP(baseUrl, currentUrl) {
  const response = await axios.get(currentUrl);
  const html = response.data;
  const root = parse(html);

  // CSR detection logic
  const isCSR = detectCSR(html, root);

  if (!isCSR) {
    const links = extractLinks(root, baseUrl, currentUrl);
    return { links, isCSR: false };
  }

  return { links: [], isCSR: true };
}

// Puppeteer-based link extraction
async function getLinksWithPuppeteer(browser, baseUrl, currentUrl) {
  const page = await browser.newPage();

  try {
    await page.goto(currentUrl, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for content to load
    await page.waitForSelector("a", { timeout: 5000 }).catch(() => {});

    // Extract all links
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

// Detect if a page is client-side rendered
function detectCSR(html, root) {
  // Check for common CSR indicators
  const hasNextJSMarkers =
    html.includes('id="__next"') || html.includes("data-reactroot");
  const hasEmptyBody = root.querySelector("body").childNodes.length < 5;
  const hasLoadingIndicator =
    html.includes("loading") || html.includes("spinner");
  const hasManyScripts = root.querySelectorAll("script").length > 10;

  // Check for SPA frameworks
  const hasReact = html.includes("react");
  const hasVue = html.includes("vue");
  const hasAngular = html.includes("angular");

  // Minimal content with JS loading is a good indicator of CSR
  const contentToScriptRatio =
    html.length / (html.match(/<script/g)?.length || 1);
  const lowContentRatio = contentToScriptRatio < 1000;

  return (
    (hasNextJSMarkers && (hasEmptyBody || hasLoadingIndicator)) ||
    (hasEmptyBody && hasManyScripts) ||
    (lowContentRatio && (hasReact || hasVue || hasAngular))
  );
}

// Extract and normalize links
function extractLinks(root, baseUrl, currentUrl) {
  const links = [];
  const currentUrlObj = new URL(currentUrl);
  const baseUrlObj = new URL(baseUrl);

  // Get all anchor tags
  const anchors = root.querySelectorAll("a");

  for (const anchor of anchors) {
    const href = anchor.getAttribute("href");
    if (!href) continue;

    try {
      // Resolve relative URLs
      const url = new URL(href, currentUrl);

      // Only include links from the same domain
      if (url.hostname === baseUrlObj.hostname) {
        // Remove hash and query parameters
        url.hash = "";

        // Add to list if it's a valid page
        if (isValidUrl(url.href) && url.pathname !== currentUrlObj.pathname) {
          links.push(url.href);
        }
      }
    } catch {}
  }

  return [...new Set(links)];
}

// Check if URL should be included in sitemap
function isValidUrl(url) {
  // Skip non-HTML resources
  const skipExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".pdf",
    ".zip",
    ".css",
    ".js",
  ];
  if (skipExtensions.some((ext) => url.toLowerCase().endsWith(ext))) {
    return false;
  }

  return true;
}

// Generate XML sitemap
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

// Main function
export async function createSitemap(websiteUrl, maxPages = 100) {
  const baseUrl = new URL(websiteUrl).origin;
  const urls = await crawlSite(baseUrl, maxPages);
  return generateSitemap(urls);
}

createSitemap("https://mcards.in", 100).then((sitemap) => {
  console.log(sitemap);
});
