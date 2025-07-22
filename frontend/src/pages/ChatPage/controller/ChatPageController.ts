import { getMessages } from '../../../data/chat';
import { Message } from '../../../model/message'

class ChatPageController {
  messages: Message[] = [];

  async init() {
    const response = await getMessages("b4ee5105-aabd-4c74-a631-3022337ec5ec");
    if (!response) {
      console.error("Failed to fetch messages");
      return [];
    }
    this.messages = Array.isArray(response) ? response : [];
    return this.messages;
  }
}

export default ChatPageController;