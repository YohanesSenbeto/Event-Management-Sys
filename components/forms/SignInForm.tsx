// components/forms/SignInForm.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            // Implement your signin logic here (e.g., authenticate user)
            console.log("Signin data:", data);
        } catch (error) {
            setError("Invalid email or password");
            console.error("Error signing in:", error);
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.email && (
                    <p className="text-red-500 text-xs italic">
                        Email is required
                    </p>
                )}
            </div>

            <div className="mb-6">
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.password && (
                    <p className="text-red-500 text-xs italic">
                        Password is required
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-xs italic">{error}</p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default SignInForm;
