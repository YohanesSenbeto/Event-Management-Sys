export const dynamic = "force-dynamic";
import React from "react";
import { prisma } from "@/lib/prisma";
import AddTodo from "@/components/shared/AddTodo";
import Todo from "@/components/shared/Todo";
import HomePage from "@/components/HomePage";
import { Todo as TodoType } from "@/types/todo"; // Import your Todo type

const fetchTodos = async (): Promise<TodoType[]> => {
    try {
        const todos = await prisma.todo.findMany();
        return todos.map((todo) => ({
            ...todo,
            updatedAt: todo.updatedAt ?? new Date(),
        }));
    } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
    }
};

const Todos = async () => {
    const todos = await fetchTodos();

    return (
        <>
            <div className="w-screen py-2 flex justify-center flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
                <div className="text-center mb-6 px-4 md:px-6">
                    <span className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight md:text-4xl transition-all duration-300 transform hover:scale-105">
                        Event Management System
                    </span>
                </div>

                <div className="flex flex-col items-center w-full max-w-4xl bg-white p-1 rounded-lg shadow-2xl md:shadow-xl mb-80">
                    <AddTodo />
                    <div className="flex flex-col gap-4 sm:gap-6 items-center justify-center mt-8 w-full">
                        {todos.map((todo: TodoType) => (
                            <div className="w-full" key={todo.id}>
                                <Todo todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <HomePage />
        </>
    );
};

const Home = async () => {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Todos />
        </React.Suspense>
    );
};

export default Home;
