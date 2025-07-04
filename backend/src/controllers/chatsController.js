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
        const existingUserIds = users.map(user => user.id);
        if (existingUserIds.length !== userIds.length) {
            return res.status(404).json({ error: 'One or more users not found' });
        }

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
        const chat = await prisma.chat.create(
            { data: {} }
        );

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

const readChatById = async (req, res) => {
    const id = req.params.id;
    try {
        const chat = await prisma.chat.findUnique({
            where: { id },
            include: {
                participants: {
                    include: {
                        user: true
                    }
                },
                messages: {
                    include: {
                        sender: true
                    }
                }
            }
        });

        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        // Mark the chat as read (if applicable)
        // This could be a field in the chat or participant model

        res.status(200).json(chat);
    } catch (error) {
        console.error('Error reading chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const openChatById = async (req, res) => {
    const id = req.params.id;
    console.log('Opening chat with ID:', id);
    try {
        const chat = await prisma.chat.findUnique({
            where: { id },
            include: {
                participants: {
                    include: {
                        user: true
                    }
                },
                messages: {
                    include: {
                        sender: true
                    }
                }
            }
        });

        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        res.status(200).json(chat);
    } catch (error) {
        console.error('Error opening chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllChats = async (req, res) => {
    try {
        const chats = await prisma.chat.findMany({
            include: {
                participants: {
                    include: {
                        user: true
                    }
                },
                messages: {
                    include: {
                        sender: true
                    }
                }
            }
        });

        res.status(200).json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteChatById = async (req, res) => {
    const id = req.params.id;

    try {
        const chat = await prisma.chat.findUnique({
            where: { id }
        });

        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        await prisma.chat.delete({
            where: { id }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const pinChat = async (req, res) => {
    const id = req.params.id;

    try {
        const chat = await prisma.chat.update({
            where: { id },
            data: { pinned: true }
        });

        res.status(200).json(chat);
    } catch (error) {
        console.error('Error pinning chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const unpinChat = async (req, res) => {
    const id = req.params.id;

    try {
        const chat = await prisma.chat.update({
            where: { id },
            data: { pinned: false }
        });

        res.status(200).json(chat);
    } catch (error) {
        console.error('Error unpinning chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createChat,
    openChatById,
    deleteChatById,
    pinChat,
    unpinChat,
    getAllChats,
    readChatById
};