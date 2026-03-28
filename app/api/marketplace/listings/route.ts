import { NextResponse } from "next/server";
import { createMarketListing, getActiveListings } from "@/src/server/repository";

export async function GET() {
  try {
    const listings = await getActiveListings();
    return NextResponse.json(listings);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load listings.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const listings = await createMarketListing(payload);
    return NextResponse.json(listings);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create listing.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
