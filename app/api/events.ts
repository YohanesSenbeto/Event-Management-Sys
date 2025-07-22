import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Fetch events from the database
            const events = await prisma.todo.findMany();
            console.log(events)
            // Respond with the events in JSON format
            res.status(200).json(events);
        } catch (error) {
            // Log the error for debugging
            console.error('Error fetching events:', error);
            // Respond with a 500 status code and error message
            res.status(500).json({ error: 'Error fetching events' });
        }
    } else {
        // Handle unsupported HTTP methods
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
