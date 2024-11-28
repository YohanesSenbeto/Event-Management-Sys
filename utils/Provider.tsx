"use client"; // Marks this file as a client component in a Next.js app.

/*
  React Query Provider Component
  -------------------------------
  This component wraps its children with the QueryClientProvider, 
  which provides a React Query client instance to manage server-state efficiently.

  Features:
  - Initializes a single QueryClient instance using `useState`.
  - Includes ReactQueryDevtools for debugging React Query cache and state during development.
*/

import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Define the shape of the props accepted by the Provider component.
interface ProviderProps {
    children: ReactNode; // ReactNode allows any valid React child elements (e.g., JSX, strings, etc.)
}

export default function Provider({ children }: ProviderProps) {
    // Create a single QueryClient instance with lazy initialization for performance.
    const [queryClient] = useState(() => new QueryClient());

    return (
        // Wrap the children with the QueryClientProvider to enable React Query functionality.
        <QueryClientProvider client={queryClient}>
            {children}

            {/* Add React Query Devtools to debug queries and cache during development. */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
