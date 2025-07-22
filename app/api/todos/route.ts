// app/api/todos/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
    const todos = await prisma.todo.findMany();
    console.log(todos);
    return NextResponse.json(todos);
}
