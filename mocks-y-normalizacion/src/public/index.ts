import { io } from 'socket.io-client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EChatMessage, EProductMessage } from '../types/websockets';

const clientSocket = io();
//* ----------------------------- Products ---------------------------------------------
interface IClientProduct {
  title: string;
  price: string;
  url: string;
}

const getProductsButton = document.querySelector('#get-products') as HTMLButtonElement;
const productList = document.querySelector('#product-table') as HTMLElement;

const productSubmit = async (event: Event) => {
  event.preventDefault();
  productList.innerHTML =
    '<div class="lds-ripple"><div></div><div></div></div>';

  const data = await fetch('http://localhost:3000/api/test-products');
  const products = (await data.json()) as IClientProduct[];
  for (const product of products) {
    const blobData = await fetch(product.url);
    const blob = await blobData.blob();
    const imageURL = URL.createObjectURL(blob);
    product.url = imageURL;
  }

  if (products.length < 1) {
    productList.innerHTML = '<h2>Oops! try again</h2>';
  } else {
    const productsRows = products
      .map(
        ({ title, price, url }) => `
    <tr>
      <th scope="row" class="table_product_name">${title}</th>
      <td>${price}</td>
      <td class="table_cell_image">
        <img
          class="table_image"
          src=${url}
          alt="product-image">
      </td>
    </tr>
    `
      )
      .join('');
    const html = `
    <h2>Product List</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
        </tr>
      </thead>
      <tbody>
        ${productsRows}
      </tbody>
    </table>
    `;
    productList.innerHTML = html;
  }
};

getProductsButton.onclick = async (e) => {
  await productSubmit(e);
  console.log('probando boton!');
};

//* ----------------------------- Chat Messages ---------------------------------------------

interface IChatMessages {
  email: string;
  message: string;
  dateTime: string | Date;
  id: string;
}

const chatForm = document.querySelector('#chat-form') as HTMLFormElement;
const messagesList = document.querySelector('#messages-table') as HTMLElement;
const chatMessageInput = document.querySelector('#chat-message') as HTMLInputElement;

const chatMessageSubmit = (
  event: SubmitEvent,
  form: HTMLFormElement,
  socketMessage: EChatMessage
): void => {
  event.preventDefault();
  const inputsRetriever = new FormData(form) as unknown as Iterable<
  [Partial<IChatMessages>, FormDataEntryValue]
  >;
  const chatMessage: Omit<IChatMessages, 'id'> = Object.fromEntries(inputsRetriever);
  const dateUTC = new Date(new Date().toUTCString());
  chatMessage.dateTime = dateUTC;
  clientSocket.emit(socketMessage, chatMessage);
  chatMessageInput.value = '';
};

chatForm.addEventListener('submit', (e) =>
  chatMessageSubmit(e, e.target as HTMLFormElement, EChatMessage.client)
);

clientSocket.on(EChatMessage.server, ({ messages }: { messages: IChatMessages[] }) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (messages.length < 1) {
    messagesList.innerHTML = '<h2>There is no messages to show!</h2>';
  } else {
    const messagesRows = messages
      .map(
        ({ email, message, dateTime }) => `
    <tr>
      <td class="chat-message-row">
        <span style="color: blue"><b>${email}</b></span>
        <span style="color: red">[${new Date(dateTime).toLocaleString('es-CL', {
    timeZone: timezone,
  })}]:</span>
        <span style="color: green"><i>${message}</i></span>
      </td>
    </tr>
    `
      )
      .join('');
    const html = `
    <h2>Chat Messages</h2>
    <table class="table-messages ">
      <tbody>
        ${messagesRows}
      </tbody>
    </table>
    `;
    messagesList.innerHTML = html;
  }
});
