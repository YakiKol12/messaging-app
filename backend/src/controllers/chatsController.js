const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createChat = async (req, res) => {
    const { userIds } = req.body;
    try {
        // Validate userIds
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ error: 'Invalid user IDs' });
        }

        // Check if all userIds exist in the database
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            },
            select: {
                id: true
            }
        });

        // Check if a chat already exists with the same participants
        const chats = await prisma.chat.findMany({
            where: {
                participants: {
                    every: {
                        userId: { in: userIds }
                    }
                }
            },
            include: {
                participants: true
            }
        });
        if (chats.length > 0) {
            return res.status(409).json({ error: 'Chat already exists with these participants' });
        }

        // Create a new chat
        const chat = await prisma.chat.create();

        const chatParticipants = userIds.map(userId => ({
            userId,
            chatId: chat.id
        }));

        await prisma.chatParticipant.createMany({
            data: chatParticipants
        });

        res.status(201).json(chat);
    }
    catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
  createChat,
};