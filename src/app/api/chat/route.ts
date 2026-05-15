import { NextRequest, NextResponse } from "next/server";
import { getPdfsForBlock, getPdfBase64 } from "@/lib/db/pdf-store";

const DEFAULT_API_KEY = "AIzaSyCx4hz7uEJpYODK1nw744zFAsjWAet7Mgo";

export async function POST(request: NextRequest) {
  try {
    const { blockId, blockTitle, bibliography, message, history } = await request.json();

    if (!blockId || !message) {
      return NextResponse.json({ error: "blockId e message são obrigatórios" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || DEFAULT_API_KEY;

    // 1. Buscar os PDFs vinculados a este bloco
    const pdfDocs = await getPdfsForBlock(blockId.toString());

    // 2. Montar as partes (parts) para o Gemini
    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

    // Adicionar os PDFs convertidos em Base64
    for (const doc of pdfDocs) {
      try {
        const base64Data = await getPdfBase64(doc.filePath);
        parts.push({
          inlineData: {
            mimeType: "application/pdf",
            data: base64Data
          }
        });
      } catch (err) {
        console.warn(`Aviso: não foi possível ler o arquivo PDF ${doc.name}`, err);
      }
    }

    // Contexto inicial com ementa do bloco
    const pdfsContextText = pdfDocs.length > 0 
      ? `\nOs documentos em PDF anexados acima contêm a base de dados enviada pelo aluno para este módulo. Responda a pergunta baseando-se ativamente no conhecimento e nas informações presentes nestes PDFs.`
      : `\nNenhum PDF foi anexado a este bloco ainda. Responda com base no seu conhecimento geral sobre as obras recomendadas: ${bibliography?.join(", ")}.`;

    // Histórico de mensagens anteriores (opcional para dar mais fluidez)
    const formattedHistory = history && Array.isArray(history) && history.length > 0
      ? `\nHistórico recente da conversa:\n` + history.map((h: { sender: string; text: string }) => `${h.sender === "user" ? "Aluno" : "Professor"}: ${h.text}`).join("\n")
      : "";

    // Adiciona o prompt textual final
    parts.push({
      text: `Contexto Acadêmico do Módulo:\nTítulo do Bloco: ${blockTitle}\n${formattedHistory}${pdfsContextText}\n\nPergunta do Aluno: ${message}`
    });

    // 3. Fazer a requisição para a API REST oficial do Gemini 1.5 Flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts
        }
      ],
      systemInstruction: {
        parts: [
          {
            text: "Você é um Professor Particular especialista de Engenharia Biomédica na plataforma BioMédica. Sua missão é atuar de forma acolhedora, precisa e acadêmica. Se houver documentos PDF anexados na requisição, utilize ativamente e prioritariamente o conteúdo deles para embasar sua resposta, citando conceitos do documento quando oportuno. Formate sua resposta com excelente legibilidade usando Markdown, tópicos e negritos conforme necessário."
          }
        ]
      },
      generationConfig: {
        temperature: 0.3, // Baixa temperatura para maior fidelidade aos PDFs
        maxOutputTokens: 2048
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        error: "Erro na API do Google Gemini", 
        details: data.error?.message || JSON.stringify(data) 
      }, { status: response.status });
    }

    const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Não foi possível gerar uma resposta. Tente novamente.";

    return NextResponse.json({ answer: answerText });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ error: "Erro interno no servidor ao processar o chat", details: msg }, { status: 500 });
  }
}
