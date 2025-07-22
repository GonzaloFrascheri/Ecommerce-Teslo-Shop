import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.redirect("/");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  });

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.redirect("/");

  const { name, email } = await req.json();

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, email },
  });

  return NextResponse.json({ ok: true });
}

