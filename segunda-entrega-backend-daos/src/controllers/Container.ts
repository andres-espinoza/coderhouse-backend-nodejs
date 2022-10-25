import * as fs from 'fs';
import Product from '../models/Product';
import ShoppingCart from '../models/shoppingCart';

export type FileData = { products: Product[] } & { shoppingCarts: ShoppingCart[] };

class Container {
  readonly FilePath: string;

  constructor(filePath: string) {
    this.FilePath = filePath;
  }

  get GetItems(): Promise<Product[] | ShoppingCart[]> {
    return fs.promises
      .readFile(this.FilePath)
      .then((file: any) => JSON.parse(file))
      .then((data: FileData) => {
        if (/products.json$/.test(this.FilePath)) return data.products as Product[];
        return data.shoppingCarts as ShoppingCart[];
      });
  }

  Save(data: FileData): Promise<void> {
    const dataToInsert = JSON.stringify(data);
    return fs.promises.writeFile(this.FilePath, dataToInsert, 'utf8');
  }
}

export default Container;
