import { NextResponse } from "next/server";
import { recordMockPvp } from "@/src/server/repository";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const snapshot = await recordMockPvp(payload);
    return NextResponse.json(snapshot);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to run mock PvP duel.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
