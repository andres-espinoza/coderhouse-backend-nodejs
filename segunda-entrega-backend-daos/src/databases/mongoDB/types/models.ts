// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document, PopulatedDoc } from 'mongoose';
import { IShoppingCart, IProduct } from '../../../models';

export interface ProductModel extends IProduct, Document {}
export interface ShoppingCartModel extends Omit<IShoppingCart, 'products'>, Document {
  products: PopulatedDoc<Omit<unknown, keyof ProductModel>>[];
}

