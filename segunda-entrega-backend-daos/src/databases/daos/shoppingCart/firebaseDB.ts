import * as admin from 'firebase-admin';
import FirebaseDBContainer from '../../containers/firebaseDB';
import { shoppingCartFirebaseModel } from '../../firebase';
import ProductsFirebaseDAO from '../product/firebaseDB';

class ShoppingCartsFirebaseDAO extends FirebaseDBContainer {
  constructor() {
    super(shoppingCartFirebaseModel);
  }

  public override async create(resource: any = null): Promise<any> {
    if (resource !== null) {
      const { products } = resource;
      await this.collection
        .doc()
        .set({ products, timestamp: admin.firestore.FieldValue.serverTimestamp() });
    } else {
      await this.collection
        .doc()
        .set({ products: [], timestamp: admin.firestore.FieldValue.serverTimestamp() });
    }
    return resource;
  }

  public override async getById(id: string): Promise<any> {
    const shoppigCart = await this.collection.doc(id).get();
    if (shoppigCart.exists) {
      const productsIds = shoppigCart.data()?.products;
      if (productsIds.length > 0) {
        const products = [];
        for (const prodId of productsIds) {
          const prod = await ProductsFirebaseDAO.getById(prodId);
          products.push(prod);
        }
        return {
          products,
          timestamp: shoppigCart.data()?.timestamp.toDate(),
        };
      }
      return null;
    }
  }

  public override async updateById(id: string, resource: any): Promise<string> {
    await this.collection.doc(id).set({ products: resource }, { merge: true });
    return 'Succesfully updated';
  }

  public async deleteProductById(cartId: string, productId: string): Promise<string> {
    const shoppigCart = this.collection.doc(cartId);
    const shoppigCartData = await shoppigCart.get();
    if (shoppigCartData.exists) {
      const productsIds = shoppigCartData.data()?.products;
      if (productsIds.length < 1) return 'Empty Shopping Cart';
      const filteredProductsIds = productsIds.filter((prodId: string) => prodId !== productId);
      await shoppigCart.set({ products: filteredProductsIds }, { merge: true });
    }
    return 'Succesfully deleted';
  }
}

export default new ShoppingCartsFirebaseDAO();
