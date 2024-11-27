import Head from "next/head";
import TodoTable from "./TodoTable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const HomePage: React.FC = async () => {
    const todos = await prisma.todo.findMany();

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
            <Head>
                <title>Todo App</title>
            </Head>

            {/* Heading Section */}
            <div className="text-center py-10 px-6 md:px-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight md:text-5xl transition-all duration-300 transform hover:scale-105">
                    Todo Lists
                </h1>
                <p className="text-lg font-medium text-gray-600 max-w-2xl mx-auto mb-8">
                    A powerful platform for managing your daily tasks and events
                    efficiently.
                </p>
            </div>

            {/* Todo Table Section */}
            <div className="flex justify-center px-4 sm:px-8">
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl">
                    <TodoTable data={todos} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
