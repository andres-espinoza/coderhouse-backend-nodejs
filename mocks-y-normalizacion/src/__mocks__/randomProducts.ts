import { faker } from '@faker-js/faker/locale/es';
import { IProduct } from '../model/Product';

const createRandomProducts = (quantity: number = 5) => {
  const randomProducts: IProduct[] = [];
  let counter = 0;
  while (counter <= quantity) {
    const product: IProduct = {
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price(30000, 100000, 0)),
      url: faker.image.technics(300, 300),
    };
    randomProducts.push(product);
    counter++;
  }
  console.log(randomProducts);
  return randomProducts;
};

export default createRandomProducts;
