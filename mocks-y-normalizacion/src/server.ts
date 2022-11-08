import express from 'express';
import './DB/models/dbProducts';
import './DB/models/dbMessages';
import path from 'path';
import { create } from 'express-handlebars';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import {
  chatMessagesEmiter,
  chatMessagesReceiver,
} from './controller/websocket/chatMessagesHandler';
import createRandomProducts from './__mocks__/randomProducts';

const app = express();
const httpServer = createServer(app);
const socketServer = new Server(httpServer, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = create({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: path.join(__dirname, '/public'),
});

app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api/test-products', (_req, res) => {
  try {
    const randomProducts = createRandomProducts();
    res.status(200).send(randomProducts);
  } catch (error: any) {
    console.log(`Error on createRandomProducts: ${error?.message}`);
    res.sendStatus(500);
  }
});

app.use('/', (_req, res) => res.render('index.hbs'));

socketServer.on('connection', async (client: Socket) => {
  console.log(client.id);
  await chatMessagesEmiter(socketServer);
  chatMessagesReceiver(socketServer, client);
});

socketServer.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socketServer.on('disconnect', () => {
  socketServer.removeAllListeners();
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Http Server listening port: http://localhost:${PORT}`);
});
