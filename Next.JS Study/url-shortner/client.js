"use client";
import React, { useState } from "react";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const generateShortenedUrl = async (url) => {
    setLoading(true);
    setError("");

    try {
      if (url) {
        // Construct the API URL
        const apiUrl = `https://tinyurl.com/api-create.php?url=${url}`;
        // Fetch API to get shortened URL
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("An error occurred while shortening the URL.");
        }
        const data = await response.text();
        setShortenedUrl(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = originalUrl.trim();
    if (!url) {
      setError("Please provide a URL.");
      return;
    }
    if (!isValidUrl(url)) {
      setError("Please provide a valid URL.");
      return;
    }
    generateShortenedUrl(url);
  };

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="w-full sm:w-96">
        <h2 className="xl:text-[30px] text-[#1c2f44] md:text-2xl text-xl font-bold text-start mb-4 leading-normal md:leading-[2.5rem] xl:leading-[3rem]">
          URL Shortener Tool
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left pl-1 text-sm font-medium text-gray-700 mb-2">
              Enter your URL
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="https://example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded font-medium transition-all duration-200 ease-in-out
              border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md hover:scale-105 active:scale-95
              px-4 py-2 text-base
              cursor-pointer"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortenedUrl && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-800">Your shortened URL:</p>
            <a
              href={shortenedUrl}
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenedUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
