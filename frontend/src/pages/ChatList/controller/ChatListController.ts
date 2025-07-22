import { getChats } from '../../../data/chatListItem';
import { Chat } from '../../../model/chat';

class ChatListController {
    chats: Chat[] = [];

    async init() {
        const response = await getChats("b4ee5105-aabd-4c74-a631-3022337ec5ec");
        console.log("Raw response:", response);

        // If API returns { chats: [...] }, extract it
        this.chats = Array.isArray(response) ? response : [];
        return this.chats;
    }
}

export default ChatListController;