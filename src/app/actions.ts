"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

export async function getUserData() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const userId = (session.user as any).id;

  const progresses = await prisma.progress.findMany({ where: { userId } });
  const notes = await prisma.topicNote.findMany({ where: { userId } });
  
  let accessesIds: number[] = [];
  if ((session.user as any).role === "ADMIN") {
     // Return 1..8 manually or just a large array
     accessesIds = [1, 2, 3, 4, 5, 6, 7, 8];
  } else {
     const accesses = await prisma.courseAccess.findMany({ where: { userId } });
     accessesIds = accesses.map(a => a.partId);
  }
  
  return { 
    progresses, 
    notes, 
    accesses: accessesIds,
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
