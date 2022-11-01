// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document, PopulatedDoc } from 'mongoose';

export enum MongoDBModels {
  Product = 'Product',
  ShopingCart = 'ShoppingCart',
}

export interface IProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  url: string;
  timestamp: Date;
}

export interface ProductModel extends Document {
  title: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  url: string;
  timestamp: Date;
}

export interface IShoppingCart {
  timestamp: Date;
  products: Partial<IProduct>[];
}

export interface ShoppingCartModel extends Omit<IShoppingCart, 'products'>, Document {
  products: PopulatedDoc<Omit<unknown, keyof ProductModel>>[];
}

