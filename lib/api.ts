// lib/api.ts
export const fetchEvents = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/app/api/events`);
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return response.json();
};