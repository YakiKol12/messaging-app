const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { text, userId } = req.body;

    try {
        const message = await prisma.message.create({
            data: {
                chatId,
                userId,
                text
            }
        });

        // Update last message info in chat
        await prisma.chat.update({
            where: { id: chatId },
            data: {
                lastMessageText: text,
                lastMessageAt: new Date(),
            },
        });
        
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
};


module.exports = {
    sendMessage,
};