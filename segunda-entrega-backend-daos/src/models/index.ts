export interface IProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  url: string;
  timestamp: Date;
}

export interface IShoppingCart {
  timestamp: Date;
  products: Partial<IProduct>[];
}
