// pages/api/todos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                return await getTodos(req, res);
            case 'POST':
                return await createTodo(req, res);
            case 'PUT':
                return await updateTodo(req, res);
            case 'DELETE':
                return await deleteTodo(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}

async function getTodos(req: NextApiRequest, res: NextApiResponse) {
    try {
        const todos = await prisma.todo.findMany({
            select: {
                title: true,
                id: true,
                isCompleted: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        return res.status(500).json({ error: 'Error fetching todos' });
    }
}

async function createTodo(req: NextApiRequest, res: NextApiResponse) {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Valid title is required' });
    }

    try {
        const createdTodo = await prisma.todo.create({
            data: { title },
        });
        return res.status(201).json(createdTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        return res.status(500).json({ error: 'Error creating todo' });
    }
}

async function updateTodo(req: NextApiRequest, res: NextApiResponse) {
    const { id, title, isCompleted } = req.body;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    if (typeof title !== 'string' || typeof isCompleted !== 'boolean') {
        return res.status(400).json({ error: 'Valid title and isCompleted status are required' });
    }

    try {
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { title, isCompleted },
        });
        return res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        return res.status(500).json({ error: 'Error updating todo' });
    }
}

async function deleteTodo(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        await prisma.todo.delete({ where: { id } });
        return res.status(204).end();
    } catch (error) {
        console.error('Error deleting todo:', error);
        return res.status(500).json({ error: 'Error deleting todo' });
    }
}
