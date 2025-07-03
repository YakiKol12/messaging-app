const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chatsController');

// Create a new chat
router.post('/create', chatsController.createChat);

// // Pin a chat
// router.post('/pin/:id', chatsController.pinChat);

// // Unpin a chat
// router.post('/unpin/:id', chatsController.unpinChat);

// // Get all chats
// router.get('/', chatsController.getAllChats);

// Get a chat by ID
router.get('/open/:id', chatsController.openChatById);

// // Read a chat by ID
// router.get('/read/:id', chatsController.readChatById);

// // Delete a chat by ID
// router.delete('/delete/:id', chatsController.deleteChatById);

module.exports = router;