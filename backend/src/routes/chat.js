const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chatController');

// post a new message
router.post('/:chatId/sendMessage', chatsController.sendMessage);

// get all messages in a chat
router.get('/:chatId/getHistory', chatsController.getMessages);

// delete a message
router.delete('/:chatId/deleteMessage/:messageId', chatsController.deleteMessage);

// update a message
router.patch('/:chatId/updateMessage/:messageId', chatsController.updateMessage);

module.exports = router;
