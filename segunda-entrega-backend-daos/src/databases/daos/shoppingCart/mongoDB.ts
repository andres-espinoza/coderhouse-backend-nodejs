import { PopulatedDoc } from 'mongoose';
import MongoDBContainer from '../../containers/mongoDB';
import { shoppingCartMongoModel } from '../../mongoDB/models';
import { ProductModel, ShoppingCartModel } from '../../mongoDB/types/models';

class ShoppingCartsMongoDAO extends MongoDBContainer {
  constructor() {
    super(shoppingCartMongoModel);
  }

  override async getById(id: string): Promise<ShoppingCartModel | null> {
    const searchedItem : PopulatedDoc<Partial<ProductModel>> = await this.collection
      .findById(id)
      .populate({ path: 'products', select: ['title, description, price'] });
    return searchedItem;
  }

  override async getAll(): Promise<ShoppingCartModel[]> {
    const items: ShoppingCartModel[] = await this.collection
      .find({})
      .populate({ path: 'products', select: ['title, description, price'] });
    return items;
  }
}

export default ShoppingCartsMongoDAO;
