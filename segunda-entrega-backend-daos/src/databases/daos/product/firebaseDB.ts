import FirebaseDBContainer from '../../containers/firebaseDB';
import { productFirebaseModel } from '../../firebase';

export class ProductsFirebaseDAO extends FirebaseDBContainer {
  constructor() {
    super(productFirebaseModel);
  }
}

export default new ProductsFirebaseDAO();
