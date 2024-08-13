// app/api/users/createUser.ts
import { prisma } from "@/utils/prisma";

type CreateUserInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export async function createUser(data: CreateUserInput) {
    try {
        const { email, password, firstName, lastName } = data;

        const user = await prisma.user.create({
            data: {
                email,
                password,
                firstName,
                lastName,
            },
        });

        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}
