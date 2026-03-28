import { NextResponse } from "next/server";
import { syncProfileState } from "@/src/server/repository";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const snapshot = await syncProfileState(payload);
    return NextResponse.json(snapshot);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to sync profile.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
