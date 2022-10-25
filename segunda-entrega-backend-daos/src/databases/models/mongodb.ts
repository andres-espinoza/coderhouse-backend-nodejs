import { model } from 'mongoose';
import productsMongoSchema from '../schemas/mongodb';

// Sirve para las operaciones CRUD
const productModelMongo = model('Products', productsMongoSchema);

export default productModelMongo;
