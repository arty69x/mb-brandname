import { NextRequest, NextResponse } from "next/server";
import { MockDB } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const featured = searchParams.get("featured") === "true";
  const newArrival = searchParams.get("newArrival") === "true";
  const search = searchParams.get("search") || undefined;
  const brand = searchParams.get("brand") || undefined;
  const sort = (searchParams.get("sort") as any) || undefined;

  try {
    const products = await MockDB.getProducts({
      category,
      featured,
      newArrival,
      search,
      brand,
      sort,
    });
    return NextResponse.json({
      success: true,
      data: products,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProduct = await MockDB.createProduct(body);
    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 400 },
    );
  }
}
