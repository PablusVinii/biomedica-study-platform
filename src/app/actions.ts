"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function toggleTopicProgress(topicId: string, completed: boolean) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Não autenticado");

  const userId = (session.user as any).id;

  if (completed) {
    await prisma.progress.upsert({
      where: { userId_topicId: { userId, topicId } },
      update: { completed: true },
      create: { userId, topicId, completed: true }
    });
  } else {
    await prisma.progress.deleteMany({
      where: { userId, topicId }
    });
  }
}

export async function saveTopicNotebookUrl(topicId: string, url: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Não autenticado");

  const userId = (session.user as any).id;

  await prisma.topicNote.upsert({
    where: { userId_topicId: { userId, topicId } },
    update: { notebookUrl: url },
    create: { userId, topicId, notebookUrl: url }
  });
}

export async function saveBlockNote(blockId: number, data: { title: string; content: string; tags: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Não autenticado");

  const userId = (session.user as any).id;

  await prisma.blockNote.upsert({
    where: { userId_blockId: { userId, blockId } },
    update: { 
      title: data.title,
      content: data.content,
      tags: data.tags
    },
    create: { 
      userId, 
      blockId, 
      title: data.title,
      content: data.content,
      tags: data.tags
    }
  });
}

export async function getUserData() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const userId = (session.user as any).id;

  const progresses = await prisma.progress.findMany({ where: { userId } });
  const notes = await prisma.topicNote.findMany({ where: { userId } });
  const blockNotes = await prisma.blockNote.findMany({ where: { userId } });
  
  let accessesIds: number[] = [];
  if ((session.user as any).role === "ADMIN") {
     const allParts = await prisma.coursePart.findMany({ select: { id: true } });
     accessesIds = allParts.map(p => p.id);
  } else {
     const accesses = await prisma.courseAccess.findMany({ where: { userId } });
     accessesIds = accesses.map(a => a.partId);
  }

  const curriculum = await prisma.coursePart.findMany({
    where: { id: { in: accessesIds } },
    orderBy: { order: "asc" },
    include: {
      course: true,
      blocks: {
        orderBy: { order: "asc" },
        include: {
          topics: {
            orderBy: { order: "asc" },
            include: {
              learningPath: true
            }
          }
        }
      }
    }
  });
  
  return { 
    progresses, 
    notes, 
    blockNotes,
    accesses: accessesIds,
    curriculum,
    user: session.user 
  };
}

export async function updateProfile(data: { name: string; password?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Não autenticado");

  const userId = (session.user as any).id;
  const updateData: any = { name: data.name };

  if (data.password && data.password.trim().length > 0) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  return { success: true };
}
