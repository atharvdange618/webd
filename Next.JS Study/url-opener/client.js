"use client";
import React, { useState } from "react";

const UrlOpener = () => {
  const [urls, setUrls] = useState("");
  const [processedUrls, setProcessedUrls] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const processUrls = (rawUrls) => {
    // Split by newlines or commas and trim each url.
    const urlList = rawUrls
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter((url) => url);

    // Filter out only valid URLs.
    const validUrls = urlList.filter((url) => isValidUrl(url));
    return validUrls;
  };

  const openUrl = (url) => {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.setAttribute("target", "_blank");
    anchor.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const rawUrls = e.target[0].value;
      if (!rawUrls.trim()) {
        setError("Please enter at least one URL");
        return;
      }

      const urlList = processUrls(rawUrls);

      if (urlList.length === 0) {
        setError("No valid URLs found");
        return;
      }

      setProcessedUrls(urlList);
      setSuccess(
        `${urlList.length} URLs processed successfully. Click the links below to open them.`
      );
    } catch (error) {
      setError("An error occurred while processing URLs");
    }
  };

  const handleReset = () => {
    setUrls("");
    setProcessedUrls([]);
    setError("");
    setSuccess("");
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <form onSubmit={handleSubmit}>
          <label htmlFor="urls" className="block text-gray-600 mb-2">
            Enter URLs (one per line or comma-separated)
          </label>
          <textarea
            placeholder="Paste your URLs here..."
            className="w-full p-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
          />
          <div className="my-6">
            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded font-medium transition-all duration-200 ease-in-out border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md hover:scale-105 active:scale-95 px-4 py-2 text-base cursor-pointer"
              >
                Process URLs
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center text-base font-bold rounded transition-all duration-200 ease-in-out border border-gray-600 bg-gray-600 text-white hover:bg-gray-700 hover:shadow-md hover:scale-105 active:scale-95 px-5 py-2 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </form>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && (
          <div className="text-green-500 text-sm mb-2">{success}</div>
        )}

        {processedUrls.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Your URLs:</h3>
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
              {processedUrls.map((url, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <span className="mr-2 text-gray-600">{index + 1}.</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate flex-1"
                  >
                    {url}
                  </a>
                  <button
                    onClick={() => openUrl(url)}
                    className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end mb-4">
              <button
                onClick={() => {
                  processedUrls.forEach((url) => {
                    openUrl(url);
                  });
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Open {Math.min(processedUrls.length)} URLs
              </button>
            </div>
          </div>
        )}

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Important Security Notice:</p>
          <p>
            Modern browsers impose security restrictions that block pop-up tabs
            or windows if they are not triggered directly by user interactions.
            This means that if you input too many URLs at once, your browser’s
            pop-up blocker may prevent some tabs from opening.
          </p>
          <ul className="list-disc ml-6">
            <li>
              <strong>Limit the number of URLs:</strong> Enter a moderate number
              of URLs to avoid triggering the pop-up blocker.
            </li>
            <li>
              <strong>Enable pop-ups:</strong> Please ensure your browser is
              configured to allow multiple pop-ups from this site.
            </li>
          </ul>
          <p>
            Adjusting these settings will help ensure the best experience while
            using our tool.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrlOpener;
