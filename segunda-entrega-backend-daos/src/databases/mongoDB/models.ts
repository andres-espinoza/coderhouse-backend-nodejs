import  { Schema, model } from 'mongoose';
import { DBModels } from '../modelsNames';
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
  products: { type: [Schema.Types.ObjectId], ref: DBModels.Product, default: [] },
});

export const productMongoModel = model<ProductModel>(DBModels.Product, productMongoSchema);
export const shoppingCartMongoModel = model<ShoppingCartModel>(DBModels.ShopingCart, shoppingCartMongoSchema);
