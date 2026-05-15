import fs from "fs/promises";
import path from "path";

export interface PdfDocument {
  id: string;
  blockId: string;
  name: string;
  size: number;
  uploadedAt: string;
  filePath: string;
}

const DB_DIR = path.join(process.cwd(), "public", "database", "pdfs");
const REGISTRY_FILE = path.join(DB_DIR, "registry.json");

// Garante que o diretório e o arquivo de registro existam
async function ensureDb() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
  } catch { /* ignore */ }

  try {
    await fs.access(REGISTRY_FILE);
  } catch {
    await fs.writeFile(REGISTRY_FILE, JSON.stringify([]), "utf-8");
  }
}

export async function getRegistry(): Promise<PdfDocument[]> {
  await ensureDb();
  try {
    const data = await fs.readFile(REGISTRY_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveRegistry(registry: PdfDocument[]) {
  await ensureDb();
  await fs.writeFile(REGISTRY_FILE, JSON.stringify(registry, null, 2), "utf-8");
}

export async function addPdf(blockId: string, name: string, buffer: Buffer): Promise<PdfDocument> {
  await ensureDb();
  const id = Date.now().toString() + "-" + Math.random().toString(36).substring(2, 7);
  const safeName = name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const fileName = `block-${blockId}-${id}-${safeName}`;
  const filePath = path.join(DB_DIR, fileName);

  await fs.writeFile(filePath, buffer);

  const newDoc: PdfDocument = {
    id,
    blockId: blockId.toString(),
    name,
    size: buffer.length,
    uploadedAt: new Date().toISOString(),
    filePath: fileName
  };

  const registry = await getRegistry();
  registry.push(newDoc);
  await saveRegistry(registry);

  return newDoc;
}

export async function getPdfsForBlock(blockId: string): Promise<PdfDocument[]> {
  const registry = await getRegistry();
  return registry.filter(doc => doc.blockId === blockId.toString());
}

export async function deletePdf(id: string): Promise<boolean> {
  const registry = await getRegistry();
  const docIndex = registry.findIndex(doc => doc.id === id);
  if (docIndex === -1) return false;

  const [doc] = registry.splice(docIndex, 1);
  await saveRegistry(registry);

  try {
    await fs.unlink(path.join(DB_DIR, doc.filePath));
  } catch { /* ignore if already deleted */ }

  return true;
}

export async function getPdfBase64(fileName: string): Promise<string> {
  const filePath = path.join(DB_DIR, fileName);
  const buffer = await fs.readFile(filePath);
  return buffer.toString("base64");
}
