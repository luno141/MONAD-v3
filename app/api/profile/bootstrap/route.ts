import { NextResponse } from "next/server";
import { bootstrapProfile } from "@/src/server/repository";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const snapshot = await bootstrapProfile(payload);
    return NextResponse.json(snapshot);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to bootstrap profile.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
