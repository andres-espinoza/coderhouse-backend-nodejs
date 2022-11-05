import MongoDBContainer from '../../containers/mongoDB';
import { productMongoModel } from '../../mongoDB/models';

export class ProductsMongoDAO extends MongoDBContainer {
  constructor() {
    super(productMongoModel);
  }
}

export default new ProductsMongoDAO();
