"use client";

import { useState } from "react";
import { z } from "zod";
import { create } from "@/app/actions/todoActions";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";

// Define the Zod schema for validation
const addTodoSchema = z.object({
    input: z
        .string()
        .min(1, "Todo cannot be empty.")
        .max(100, "Todo cannot be more than 100 characters.")
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

    const handleSubmit = async (formData: FormData) => {
        const input = formData.get("input") as string;

        try {
            // Validate the input with Zod schema
            addTodoSchema.parse({ input });

            // Call the action to create a new todo
            await create(formData);
            setError(null); // Clear error if submission is successful
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.errors.map((err) => err.message).join(", "));
            } else {
                console.error("Form submission error:", e);
                setError("An error occurred while adding the todo.");
            }
        }
    };

    return (
        <Form action={handleSubmit} className="w-1/2 m-auto">
            <div className="flex">
                <Input name="input" type="text" placeholder="Add Todo..." />
                <Button type="submit" text="Add" />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </Form>
    );
};

export default AddTodo;
