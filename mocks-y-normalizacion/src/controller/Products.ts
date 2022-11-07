import mdb from '../DB/mdbConfig';
import { IProduct } from '../model/Product';

class Products {

  async GetProducts() {
    const products = await mdb.select('*').from<IProduct>('products');
    console.log('products from DB: ', products);
    return products;
  }

  async AddProduct(product: Omit<IProduct, 'id'>) {
    await mdb('products').insert(product).then(id => console.log(`Product added with id: ${id}`));
  }
}

const ProductsInMDB = new Products();

export default ProductsInMDB;
