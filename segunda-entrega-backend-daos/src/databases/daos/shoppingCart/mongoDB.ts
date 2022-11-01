import MongoDBContainer from '../../containers/mongoDB';
import { shoppingCartMongoModel } from '../../mongoDB/models';
import { ShoppingCartModel } from '../../mongoDB/types/models';

class ShoppingCartsMongoDAO extends MongoDBContainer {
  constructor() {
    super(shoppingCartMongoModel);
  }

  public override async create(resource: any = null) {
    let newItem;
    if (resource) newItem = new this.collection(resource);
    else newItem = new this.collection();
    await newItem.save();
    return newItem;
  }

  public override async getById(id: string): Promise<ShoppingCartModel | null> {
    const searchedItem = await this.collection
      .findById(id)
      .populate({ path: 'products', select: ['title', 'description', 'price'] });
    return searchedItem;
  }

  public override async getAll(): Promise<ShoppingCartModel[]> {
    const items: ShoppingCartModel[] = await this.collection
      .find({})
      .populate({ path: 'products', select: ['title', 'description', 'price'] });
    return items;
  }

  public override async updateById(id: string, resource: any): Promise<string> {
    await this.collection.findByIdAndUpdate(id, { $set: { products: resource } });
    return 'Succesfully updated';
  }

  public async deleteProductById(cartId: string, productId: string): Promise<string> {
    await this.collection.findByIdAndUpdate(cartId, { $pull: { products: productId  } });
    return 'Succesfully deleted';
  }
}

export default new ShoppingCartsMongoDAO();
