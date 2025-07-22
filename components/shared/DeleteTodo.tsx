"use client";

import { useState } from "react";
import { deleteTodo } from "@/app/actions/todoActions";
import Button from "../ui/Button";
import { BsFillTrashFill } from "react-icons/bs";
import Form from "../ui/Form";
// Update the import path to the correct location of your todoTypes file
import { todoType } from "../../types/todoType";

const DeleteTodo = ({ todo }: { todo: todoType }) => {
    const [success, setSuccess] = useState<string | null>(null);

    const handleDelete = async (formData: FormData) => {
        try {
            await deleteTodo(formData);

            // Set success message after deletion
            setSuccess(`Todo "${todo.title}" has been deleted successfully!`);

            // Automatically clear the success message after 10 seconds
            setTimeout(() => setSuccess(null), 10000);
        } catch (error) {
            console.error("Error deleting todo:", error);
            setSuccess("Failed to delete the todo. Please try again.");
        }
    };

    return (
        <div>
            <Form action={handleDelete}>
                <input type="hidden" name="inputId" value={todo.id} />
                <Button actionButton text={<BsFillTrashFill />} type="submit" />
            </Form>
            {success && (
                <div className="relative mt-2 p-3 text-green-700 bg-green-100 border border-green-300 rounded-md text-center">
                    <p>{success}</p>
                    <button
                        onClick={() => setSuccess(null)} // Allow manual dismissal
                        className="absolute top-1 right-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteTodo;
