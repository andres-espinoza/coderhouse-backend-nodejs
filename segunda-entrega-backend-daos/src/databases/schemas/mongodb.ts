import { Schema } from 'mongoose';
import { IProductSchema } from '../../types/Product';

const imageNotFound =
  'https://chryslergroup.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png';

const productsMongoSchema = new Schema<IProductSchema>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  url: { type: String, required: true, default: imageNotFound },
  sku: { type: String, required: true },
  timestamp: { type: Number, required: true },
});

export default productsMongoSchema;
