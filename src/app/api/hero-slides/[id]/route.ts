import { NextRequest, NextResponse } from "next/server";
import { MockDB } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await MockDB.updateHeroSlide(parseInt(id), body);
    if (!updated)
      return NextResponse.json(
        { success: false, error: "Slide not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Narrative update failed" },
      { status: 400 },
    );
  }
}
