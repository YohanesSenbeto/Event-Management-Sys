"use client";
import { useQuery } from "@tanstack/react-query";
import EventTable from "@/components/shared/EventTable";
export const dynamic = "force-dynamic";

// ✅ Fixed Fetch Function
const fetchEvents = async () => {
    const baseUrl =
        typeof window !== "undefined"
            ? "" // Use relative path in browser (client-side)
            : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/todos`);

    console.log("Fetching:", `${baseUrl}/api/todos`);
    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error fetching events:", errorBody);
        throw new Error("Network response was not ok");
    }

    return response.json();
};

const EventsPage = () => {
    const {
        data: events = [],
        error,
        isLoading,
    } = useQuery({
        queryKey: ["events"],
        queryFn: fetchEvents,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-3xl font-bold mb-4">Events</h1>
            <EventTable events={events} />
        </div>
    );
};

export default EventsPage;
