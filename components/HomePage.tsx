import Head from "next/head";
import TodoTable from "./TodoTable";
import { PrismaClient, todo } from "@prisma/client";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// Define your Todo interface matching TodoTable's expected shape
interface Todo {
    _id: string;
    title: string;
    isCompleted: boolean;
    updatedAt?: string | Date | null;
    createdAt?: string | Date | null;
}

const HomePage: React.FC = async () => {
    // Fetch todos from Prisma (id field corresponds to _id in DB)
    const todos: todo[] = await prisma.todo.findMany();

    // Map todos to match the interface expected by TodoTable
    const mappedTodos: Todo[] = todos.map((todo) => ({
        _id: todo.id, // map Prisma 'id' to '_id'
        title: todo.title,
        isCompleted: todo.isCompleted,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt ?? new Date(),
    }));

    return (
        <div className="bg-gradient-to-r from-sky-100 to-blue-200 min-h-screen flex flex-col items-center">
            <Head>
                <title>Todo App</title>
            </Head>

            {/* Heading Section */}
            <header className="w-full text-center py-12 px-6 md:px-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight hover:scale-105 transition-transform duration-300">
                    🌟 Todo Lists
                </h1>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    Manage your daily tasks and events with ease and elegance ✨
                </p>
            </header>

            {/* Todo Table Section */}
            <main className="w-full max-w-5xl px-4 sm:px-8 pb-16">
                <section className="bg-white rounded-2xl shadow-2xl p-8 transition hover:shadow-blue-300 duration-300">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                        Your Tasks
                    </h2>

                    {/* Pass mappedTodos with correct _id property */}
                    <TodoTable data={mappedTodos} />
                </section>
            </main>

            {/* Footer (Optional) */}
            <footer className="text-sm text-gray-500 mt-auto py-4">
                Built with ❤️ using Next.js, Prisma & TailwindCSS
            </footer>
        </div>
    );
};

export default HomePage;
