import FirebaseDBContainer from '../../containers/firebaseDB';
import { shoppingCartFirebaseModel } from '../../firebase';

class ShoppingCartsFirebaseDAO extends FirebaseDBContainer {
  constructor() {
    super(shoppingCartFirebaseModel);
  }

  public override async create(resource: any): Promise<any> {
    if (resource instanceof Array) {
      for (const item of resource) {
        await this.collection.add(item);
      }
    } else {
      await this.collection.add(resource);
    }
    return resource;
  }
}

export default new ShoppingCartsFirebaseDAO();
