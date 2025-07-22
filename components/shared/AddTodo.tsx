// components/shared/AddTodo.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { create } from "../../app/actions/todoActions";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";

// Define the Zod schema for validation
const addTodoSchema = z.object({
    input: z
        .string()
        .min(1, "Todo cannot be empty.")
        .max(50, "Todo cannot be more than 50 characters.")
        .regex(/^[A-Za-z ]+$/, "Todo must contain only letters and spaces.")
        .refine(
            (value) => value.split(" ").length > 1,
            "Todo must be a meaningful phrase (at least two words)."
        )
        .refine(
            (value) => !/^\d+$/.test(value),
            "Todo cannot be only numbers."
        ),
});

const AddTodo = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        const input = formData.get("input") as string;

        try {
            // Validate the input with Zod schema
            addTodoSchema.parse({ input });

            // Call the action to create a new todo
            await create(formData);

            // Clear errors and set success message
            setError(null);
            setSuccess("Your Event has been created successfully!");

            // Clear the success message after a few seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.issues.map((err) => err.message).join(", "));
            } else {
                console.error("Form submission error:", e);
                setError("An error occurred while adding the todo.");
            }
        }
    };

    return (
        <Form action={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
            <div className="flex items-center gap-2">
                <Input
                    name="input"
                    type="text"
                    placeholder="Add Event..."
                    className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                    type="submit"
                    text="Add"
                    className="ml-5 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-lg font-bold py-3 px-6 rounded-md shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            {success && (
                <div className="mt-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded-md text-center">
                    {success}
                </div>
            )}
        </Form>
    );
};

export default AddTodo;
