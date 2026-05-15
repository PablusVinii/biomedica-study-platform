import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "aluno@exemplo.com" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // AUTO-SEED: Se o banco estiver vazio, cria os usuários padrão
        const userCount = await prisma.user.count();
        if (userCount === 0) {
          const hashedPassword = await bcrypt.hash("reitor123", 10);
          const studentPassword = await bcrypt.hash("aluno123", 10);
          
          await prisma.user.createMany({
            data: [
              {
                name: "Reitor Pablu",
                email: "reitor@biomedica.edu.br",
                password: hashedPassword,
                role: "ADMIN"
              },
              {
                name: "Aluno João",
                email: "aluno@biomedica.edu.br",
                password: studentPassword,
                role: "STUDENT"
              }
            ]
          });
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecretkey123",
};
