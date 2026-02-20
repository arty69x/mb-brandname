import { NextResponse } from "next/server";
import { MockDB } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const orders = await MockDB.getOrders(userId || undefined);
    return NextResponse.json({
      success: true,
      data: orders,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder = await MockDB.createOrder(body);
    return NextResponse.json({
      success: true,
      data: newOrder,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 },
    );
  }
}
