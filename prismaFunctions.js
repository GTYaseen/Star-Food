import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function adminLogin(username, password) {
    const user = await prisma.admins.findUnique({
        where: { username: username },
    });

    if (!user) {
        return { success: false, msg: "User not found" };
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
        const token = jwt.sign({ id: user.id, name: user.name }, "admin");
        return { success: true, token, user };
    } else {
        return { success: false, msg: "Wrong password!" };
    }
}

async function adminRegister(name, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.admins.create({
        data: {
            name: name,
            username: username,
            password: hashedPassword,
        },
    });

    return result;
}

// Export PrismaClient
export { PrismaClient, adminLogin, adminRegister };
