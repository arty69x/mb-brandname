import { NextResponse } from "next/server";
import { MockDB } from "@/lib/db";

export async function GET() {
  try {
    const slides = await MockDB.getHeroSlides();
    return NextResponse.json({ success: true, data: slides });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch hero slides" },
      { status: 500 },
    );
  }
}
