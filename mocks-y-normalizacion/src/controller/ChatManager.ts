import sqlite3 from '../DB/sqlite3Config';
import { IChatMessage } from '../model/ChatMessage';

class Chat {

  async GetMessages() {
    const messages = await sqlite3.select('*').from<IChatMessage>('messages');
    console.log('messages from Sqlite3: ', messages);
    return messages;
  }

  async AddMessage(message: Omit<IChatMessage, 'id'>) {
    message.dateTime = new Date(message.dateTime);
    await sqlite3('messages').insert(message).then(id => console.log(`Product added with id: ${id}`));
  }
}

const ChatManager = new Chat();

export default ChatManager;
