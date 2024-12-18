import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

import prisma from "@/app/lib/prisma";

export const POST = async (request) => {
  const data = await request.formData();
  const file = data.get("file");
  const title = data.get("title");
  const description = data.get("description");
  const price = data.get("price");
  console.log(title, description, price);

  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bufferData = await file.arrayBuffer();
  const buffer = Buffer.from(bufferData);
  const path = `./public/uploads/${Date.now()}_${file.name}`;
  const url = "http://localhost:3000" + path.substring(8);

  try {
    await writeFile(path, buffer);

    const product = await prisma.product.create({
      data: { title, description, price: parseFloat(price), fileUrl: url },
    });

    return NextResponse.json({
      response: "Successfully Upload",

      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};
