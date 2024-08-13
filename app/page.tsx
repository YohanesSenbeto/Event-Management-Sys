// app/page.tsx
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
            <div className="w-screen py-20 flex justify-center flex-col items-center">
                <span className="text-3xl font-extrabold uppercase">
                    Event Management APP
                </span>
                <h1 className="text-1xl font-extrabold uppercase mb-5">
                    Using Next JS
                    <span className="text-orange-700 ml-2">Server Actions</span>
                </h1>

                <div className="flex justify-center flex-col items-center w-[1000px]">
                    <AddTodo />
                    <div className="flex flex-col gap-5 items-center justify-center mt-10 w-full">
                        {todos.map((todo: any) => (
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
