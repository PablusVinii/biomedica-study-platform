import { NextRequest, NextResponse } from "next/server";
import { addPdf, getPdfsForBlock, deletePdf } from "@/lib/db/pdf-store";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blockId = searchParams.get("blockId");

  if (!blockId) {
    return NextResponse.json({ error: "blockId é obrigatório" }, { status: 400 });
  }

  try {
    const pdfs = await getPdfsForBlock(blockId);
    return NextResponse.json(pdfs);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ error: "Erro ao listar PDFs", details: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const blockId = formData.get("blockId") as string | null;

    if (!file || !blockId) {
      return NextResponse.json({ error: "Arquivo PDF e blockId são obrigatórios" }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Apenas arquivos PDF são permitidos" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const doc = await addPdf(blockId, file.name, buffer);

    return NextResponse.json(doc, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ error: "Erro ao salvar o PDF", details: msg }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id do PDF é obrigatório" }, { status: 400 });
  }

  try {
    const success = await deletePdf(id);
    if (!success) {
      return NextResponse.json({ error: "PDF não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ error: "Erro ao excluir o PDF", details: msg }, { status: 500 });
  }
}
