import MongoDBContainer from '../../containers/mongoDB';
import { productMongoModel } from '../../mongoDB/models';

class ProductsMongoDAO extends MongoDBContainer {
  constructor() {
    super(productMongoModel);
  }
}

export default ProductsMongoDAO;
