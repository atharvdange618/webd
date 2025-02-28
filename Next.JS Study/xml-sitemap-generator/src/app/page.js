"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [maxPages, setMaxPages] = useState(100);
  const [loading, setLoading] = useState(false);
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSitemapUrl("");

    try {
      const response = await fetch("/api/generate-sitemap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, maxPages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate sitemap");
      }

      // Create a blob URL for the XML
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setSitemapUrl(blobUrl);
    } catch (error) {
      console.error(error);
      setError(error.message || "Error generating sitemap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">XML Sitemap Generator</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Website URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-2 border rounded"
            placeholder="https://example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Max Pages to Crawl:</label>
          <input
            type="number"
            value={maxPages}
            onChange={(e) => setMaxPages(Number(e.target.value))}
            min="1"
            max="1000"
            className="w-full p-2 border rounded"
          />
          <p className="text-sm text-gray-600 mt-1">
            Higher values will take longer to complete
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md disabled:bg-gray-400 transition"
        >
          {loading ? "Generating..." : "Generate Sitemap"}
        </button>
      </form>

      {loading && (
        <div className="my-6 text-center">
          <p className="text-gray-600">
            This may take several minutes depending on the site size...
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {sitemapUrl && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <h2 className="text-xl font-bold mb-2">
            Sitemap Generated Successfully!
          </h2>
          <p className="mb-4">
            Your sitemap is ready to download. You can save it to your project
            and reference it in your robots.txt file.
          </p>
          <a
            href={sitemapUrl}
            download="sitemap.xml"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded inline-block"
          >
            Download Sitemap XML
          </a>
        </div>
      )}
    </div>
  );
}
