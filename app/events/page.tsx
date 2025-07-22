"use client";
import { useQuery } from "@tanstack/react-query";
import EventTable from "@/components/shared/EventTable";
export const dynamic = "force-dynamic";

// Fetch function
const fetchEvents = async () => {
    const response = await fetch(
        "process.env.NEXT_PUBLIC_SITE_URL + '/api/todos"
    );
    console.log(response);
    if (!response.ok) {
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
