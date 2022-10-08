import { Server, Socket } from 'socket.io';
import { IChatMessage } from '../../model/ChatMessage';
import { EChatMessage } from '../../types/websockets';
import ChatManager from '../ChatManager';

export const chatMessagesEmiter = async (server: Server) => {
  try {
    const messages = await ChatManager.GetMessages();
    server.emit(EChatMessage.server, { messages });
  } catch (error) {
    console.log(error);
    server.emit(EChatMessage.server, { messages: [] });
  }
};

export const chatMessagesReceiver = (server: Server, client: Socket) => {
  client.on(EChatMessage.client, async (message: Omit<IChatMessage, 'id'>) => {
    try {
      await ChatManager.AddMessage(message);
      const messages = await ChatManager.GetMessages();
      server.emit(EChatMessage.server, { messages });
    } catch (error) {
      console.log(error);
      server.emit(EChatMessage.server, { messages: [] });
    }
  });
};
