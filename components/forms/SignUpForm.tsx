// SignUpForm.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";
import { createUser } from "@/app/actions/todoActions";

const schema = z.object({
    email: z.string().email("Invalid email format").min(1),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

type SignUpFormData = z.infer<typeof schema>;

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<SignUpFormData>();
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (data: SignUpFormData) => {
        try {
            schema.parse(data);

            if (data.password !== data.confirmPassword) {
                setError("confirmPassword", {
                    type: "manual",
                    message: "Passwords do not match",
                });
                return;
            }

            setSubmitting(true);

            await createUser(
                data.email,
                data.password,
                data.firstName,
                data.lastName
            );

            console.log("User created successfully");
        } catch (error) {
            if (error instanceof ZodError) {
                console.error("Validation error:", error);
            } else {
                console.error("Error creating user:", error);
                setError("submit", {
                    type: "manual",
                    message: "Failed to create user",
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.email ? "border-red-500" : ""
                    }`}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs italic">
                        {errors.email.message || "Email is required"}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.password ? "border-red-500" : ""
                    }`}
                />
                {errors.password && (
                    <p className="text-red-500 text-xs italic">
                        {errors.password.message || "Password is required"}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="confirmPassword"
                >
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", { required: true })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.confirmPassword ? "border-red-500" : ""
                    }`}
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs italic">
                        {errors.confirmPassword.message ||
                            "Confirm Password is required"}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="firstName"
                >
                    First Name
                </label>
                <input
                    id="firstName"
                    type="text"
                    {...register("firstName", { required: true })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.firstName ? "border-red-500" : ""
                    }`}
                />
                {errors.firstName && (
                    <p className="text-red-500 text-xs italic">
                        {errors.firstName.message || "First Name is required"}
                    </p>
                )}
            </div>

            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                >
                    Last Name
                </label>
                <input
                    id="lastName"
                    type="text"
                    {...register("lastName", { required: true })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.lastName ? "border-red-500" : ""
                    }`}
                />
                {errors.lastName && (
                    <p className="text-red-500 text-xs italic">
                        {errors.lastName.message || "Last Name is required"}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    disabled={submitting}
                    className={`${
                        submitting
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-700"
                    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                    {submitting ? "Submitting..." : "Sign Up"}
                </button>
            </div>

            {errors.submit && (
                <p className="mt-4 text-red-500 text-xs italic">
                    {errors.submit.message}
                </p>
            )}
        </form>
    );
};

export default SignUpForm;
