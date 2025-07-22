"use client";

import { edit } from "../../app/actions/todoActions";
import Form from "../ui/Form";
import Input from "../ui/Input";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import Button from "../ui/Button";
import { todoType } from "../../types/todoType";

const EditTodo = ({ todo }: { todo: todoType }) => {
    const [editTodo, setEditTodo] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleEdit = () => {
        setEditTodo(!editTodo);
    };

    const handleSubmit = async (formData: FormData) => {
        try {
            await edit(formData); // Call the edit action

            // Show success message
            setSuccess(`Todo "${todo.title}" has been updated successfully!`);

            // Hide the edit form
            setEditTodo(false);

            // Clear success message after 5 seconds
            setTimeout(() => setSuccess(null), 5000);
        } catch (error) {
            console.error("Error updating todo:", error);
            setSuccess("Failed to update the todo. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-5 items-center p-5">
            <div className="flex gap-5 items-center">
                <Button onClick={handleEdit} text={<BiEdit />} actionButton />

                {editTodo ? (
                    <Form action={handleSubmit}>
                        <Input name="inputId" value={todo.id} type="hidden" />
                        <div className="flex items-center gap-3 w-full max-w-lg">
                            <Input
                                type="text"
                                name="newTitle"
                                placeholder="Edit Todo..."
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button
                                type="submit"
                                text="Save"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            />
                        </div>
                    </Form>
                ) : null}
            </div>

            {success && (
                <div className="mt-3 p-4 text-green-700 bg-green-100 border border-green-300 rounded-md text-center relative">
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

export default EditTodo;
