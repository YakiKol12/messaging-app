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

const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await prisma.message.findMany({
            where: { chatId },
            orderBy: { createdAt: 'asc' },
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};

const deleteMessage = async (req, res) => {
    const { chatId, messageId } = req.params;

    try {
        await prisma.message.delete({
            where: {
                id: messageId,
                chatId: chatId
            }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
};

const updateMessage = async (req, res) => {
    const { chatId, messageId } = req.params;
    const { text } = req.body;

    try {
        const message = await prisma.message.update({
            where: {
                id: messageId,
                chatId: chatId
            },
            data: {
                text: text
            }
        });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update message' });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    deleteMessage,
    updateMessage
};