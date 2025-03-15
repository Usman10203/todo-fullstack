import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const userIdInt = parseInt(userId);
        if (isNaN(userIdInt)) {
            return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
        }

        const todos = await prisma.todo.findMany({
            where: { userId: userIdInt },
        });

        return NextResponse.json(todos, { status: 200 });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        const body = await req.json();
        const { subject, userId } = body;

        if (!subject || !userId) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const userIdInt = parseInt(userId);
        if (isNaN(userIdInt)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const newTodo = await prisma.todo.create({
            data: { subject, userId: userIdInt },
        });

        return NextResponse.json(newTodo, { status: 201 });
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function PUT(req) {
    try {
        const { id, subject } = await req.json();

        if (!id || !subject.trim()) {
            return NextResponse.json({ error: "Todo ID and subject are required" }, { status: 400 });
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: { subject },
        });

        return NextResponse.json(updatedTodo, { status: 200 });
    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const todoId = searchParams.get("todoId");
        const userId = searchParams.get("userId");

        if (!todoId || !userId) {
            return NextResponse.json({ error: "Todo ID and User ID are required" }, { status: 400 });
        }

        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(todoId) },
        });

        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        if (todo.userId !== parseInt(userId)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        await prisma.todo.delete({
            where: { id: parseInt(todoId) },
        });

        return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}