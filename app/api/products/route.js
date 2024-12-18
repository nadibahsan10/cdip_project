import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
export const GET = async () => {
  try {
    const products = await prisma.product.findMany(); // Fetch all products from the database
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
