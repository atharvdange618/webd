import { NextResponse } from "next/server";
import { createSitemap } from "@/utils/sitemapGenerator";

export async function POST(request) {
  try {
    const { url, maxPages } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const sitemap = await createSitemap(url, maxPages || 100);

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return NextResponse.json(
      { error: "Failed to generate sitemap" },
      { status: 500 }
    );
  }
}
