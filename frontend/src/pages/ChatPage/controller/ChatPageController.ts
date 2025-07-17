import { getMessages } from '../../../data/chat';
import { Message } from '../../../model/message'

class ChatPageController {
  messages: Message[] = [];

  async init() {
    const response = await getMessages("943629fe-8386-4c74-97b9-78fd8271dfd5");
    console.log("Raw response:", response);

    // If API returns { messages: [...] }, extract it
    this.messages = Array.isArray(response) ? response : [];
    return this.messages;
  }
}

export default ChatPageController;