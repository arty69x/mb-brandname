import { NextRequest, NextResponse } from "next/server";
import { MockDB } from "@/lib/db";

export async function GET() {
  try {
    const categories = await MockDB.getCategories();
    return NextResponse.json({
      success: true,
      data: categories,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newCategory = await MockDB.createCategory(body);
    return NextResponse.json(
      {
        success: true,
        data: newCategory,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to define taxonomy" },
      { status: 400 },
    );
  }
}
