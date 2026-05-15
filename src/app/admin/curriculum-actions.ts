"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Acesso negado");
  }
}

export async function updateCourseTopic(topicId: string, data: { title?: string; content?: string; videoUrl?: string }) {
  await checkAdmin();
  await prisma.courseTopic.update({
    where: { id: topicId },
    data
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateCourseBlock(blockId: number, data: { title?: string; content?: string; highlights?: string[]; bibliography?: string[] }) {
  await checkAdmin();
  await prisma.courseBlock.update({
    where: { id: blockId },
    data: {
      ...data,
      highlights: data.highlights ? JSON.stringify(data.highlights) : undefined,
      bibliography: data.bibliography ? JSON.stringify(data.bibliography) : undefined,
    }
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateCoursePart(partId: number, data: { title?: string }) {
  await checkAdmin();
  await prisma.coursePart.update({
    where: { id: partId },
    data
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteCourseTopic(topicId: string) {
  await checkAdmin();
  await prisma.courseTopic.delete({ where: { id: topicId } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createCourseTopic(blockId: number, data: { title: string; content?: string; videoUrl?: string; order?: number }) {
  await checkAdmin();
  await prisma.courseTopic.create({
    data: {
      ...data,
      blockId
    }
  });
  revalidatePath("/admin");
  revalidatePath("/");
}
