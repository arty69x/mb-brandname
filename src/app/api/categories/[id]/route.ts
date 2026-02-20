import { NextRequest, NextResponse } from "next/server";
import { MockDB } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await MockDB.updateCategory(id, body);
    if (!updated)
      return NextResponse.json(
        { success: false, error: "Node not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Taxonomy update failed" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const deleted = await MockDB.deleteCategory(id);
    if (!deleted)
      return NextResponse.json(
        { success: false, error: "Node not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, message: "Node decommissioned" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Purification failed" },
      { status: 500 },
    );
  }
}
