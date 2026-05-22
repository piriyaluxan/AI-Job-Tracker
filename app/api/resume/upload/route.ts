import { NextResponse } from "next/server";
import * as pdfParse from "pdf-parse";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const pdf = (pdfParse as any).default ?? pdfParse;

  const data = await pdf(buffer);

  return NextResponse.json({
    text: data.text,
  });
}
