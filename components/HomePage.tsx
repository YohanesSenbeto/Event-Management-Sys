import Head from "next/head";
import TodoTable from "./TodoTable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const HomePage: React.FC = async () => {
    const todos = await prisma.todo.findMany();

    return (
        <div>
            <Head>
                <title>Todo App</title>
            </Head>
            <h1>Todo App</h1>
            <TodoTable data={todos} />
        </div>
    );
};

export default HomePage;
