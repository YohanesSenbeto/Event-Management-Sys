"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function create(formData: FormData) {
    const input = formData.get("input") as string;

    if (!input?.trim()) {
        // No input or empty string, just return
        return;
    }

    try {
        await prisma.todo.create({
            data: {
                title: input,
            },
        });

        // Revalidate the homepage path to update UI
        revalidatePath("/");
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
    }
}

export async function edit(formData: FormData) {
    const input = formData.get("newTitle") as string;
    const inputId = formData.get("inputId") as string;

    if (!inputId || !input?.trim()) {
        // Missing ID or empty title
        return;
    }

    try {
        await prisma.todo.update({
            where: {
                id: inputId,
            },
            data: {
                title: input,
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Error editing todo:", error);
        throw error;
    }
}

export async function deleteTodo(formData: FormData) {
    const inputId = formData.get("inputId") as string;

    if (!inputId) {
        return;
    }

    try {
        await prisma.todo.delete({
            where: {
                id: inputId,
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
}

export async function todoStatus(formData: FormData) {
    const inputId = formData.get("inputId") as string;

    if (!inputId) {
        return;
    }

    try {
        // Find the todo by ID
        const todo = await prisma.todo.findUnique({
            where: {
                id: inputId,
            },
        });

        if (!todo) {
            return;
        }

        // Toggle the `isCompleted` status (correct field name)
        const updatedStatus = !todo.isCompleted;

        // Update the todo with the new isCompleted status
        await prisma.todo.update({
            where: {
                id: inputId,
            },
            data: {
                isCompleted: updatedStatus,
            },
        });

        // Revalidate the path so UI updates
        revalidatePath("/");

        return updatedStatus;
    } catch (error) {
        console.error("Error updating todo status:", error);
        throw error;
    }
}
