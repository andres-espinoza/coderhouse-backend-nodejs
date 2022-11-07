import { Server, Socket } from 'socket.io';
import { IProduct } from '../../model/Product';
import { EProductMessage } from '../../types/websockets';
import ProductsInMDB from '../Products';

export const productsEmiter = async (server: Server) => {
  try {
    const products = await ProductsInMDB.GetProducts();
    server.emit(EProductMessage.server, { products });
  } catch (error) {
    console.log(error);
    server.emit(EProductMessage.server, { products: [] });
  }
};

export const productsReceiver = (server: Server, client: Socket) => {
  client.on(EProductMessage.client, async (product: Omit<IProduct, 'id'>) => {
    try {
      product.price = Number(product.price);
      await ProductsInMDB.AddProduct(product);
      const products = await ProductsInMDB.GetProducts();
      server.emit(EProductMessage.server, { products });
    } catch (error) {
      console.log(error);
      server.emit(EProductMessage.server, { products: [] });
    }
  });
};
