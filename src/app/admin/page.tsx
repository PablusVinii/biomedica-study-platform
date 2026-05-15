import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/AdminPanel";


const prisma = new PrismaClient();

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    where: { role: "STUDENT" },
    include: {
      courseAccess: true,
      progresses: true,
    }
  });

  // Map data to pass to client component
  const usersData = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    completedTopicsCount: u.progresses.length,
    accesses: u.courseAccess.map(a => a.partId),
  }));

  // Fetch full curriculum from DB
  const curriculum = await prisma.coursePart.findMany({
    orderBy: { order: "asc" },
    include: {
      blocks: {
        orderBy: { order: "asc" },
        include: {
          topics: {
            orderBy: { order: "asc" }
          }
        }
      }
    }
  });

  const parts = curriculum.map(p => ({
    id: p.id,
    title: p.title
  }));

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-foreground">Painel do Reitor</h1>
          <p className="text-muted-foreground">Gestão de Alunos e Liberação de Semestres</p>
        </div>
        
        <AdminPanel initialUsers={usersData} parts={parts} curriculum={curriculum} />
      </div>
    </div>
  );
}
