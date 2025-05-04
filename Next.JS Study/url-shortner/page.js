import UrlShortener from "./client";

export const metadata = {
  title: "URL Shortener - Smart Tools",
  description:
    "Effortlessly create concise and shareable links with our URL Shortener. Simplify your URLs for easier sharing and tracking.",
  keywords:
    "URL shortener, link shortening, URL generator, link management, shorten URLs",
};

export default function Page() {
  return <UrlShortener />;
}
