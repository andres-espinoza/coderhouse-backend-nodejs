import  { Schema, model } from 'mongoose';
import { MongoDBModels } from './types/models';
import { ProductModel, ShoppingCartModel } from './types/models';

const imageNotFound =
  'https://chryslergroup.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png';

const productMongoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  url: { type: String, required: true, default: imageNotFound },
  sku: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

const shoppingCartMongoSchema: Schema = new Schema({
  timestamp: { type: Date, required: true, default: Date.now },
  products: { type: [Schema.Types.ObjectId], ref: MongoDBModels.Product, default: [] },
});

export const productMongoModel = model<ProductModel>(MongoDBModels.Product, productMongoSchema);
export const shoppingCartMongoModel = model<ShoppingCartModel>(MongoDBModels.ShopingCart, shoppingCartMongoSchema);
