import { PrismaClient } from "@prisma/client";
import AddTodo from "@/components/shared/AddTodo";
import Todo from "@/components/shared/Todo";
import React from "react";
import HomePage from "@/components/HomePage";
const prisma = new PrismaClient();
const fetchTodos = async () => {
    const todos = await prisma.todo.findMany();
    return todos;
};

const Todos = async () => {
    const todos = await fetchTodos();

    return (
        <>
            <div className="w-screen py-2 flex justify-center flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
                {/* Main Heading Section */}
                <div className="text-center mb-6 px-4 md:px-6">
                    <span className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight md:text-4xl transition-all duration-300 transform hover:scale-105">
                        Event Management System
                    </span>
                </div>

                {/* Todos Section */}
                <div className="flex flex-col items-center w-full max-w-4xl bg-white p-1 rounded-lg shadow-2xl md:shadow-xl mb-80">
                    <AddTodo />
                    <div className="flex flex-col gap-4 sm:gap-6 items-center justify-center mt-8 w-full">
                        {todos.map((todo: any) => (
                            <div className="w-full" key={todo.id}>
                                <Todo todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
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
