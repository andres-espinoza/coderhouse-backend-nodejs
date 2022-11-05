import dotenv from 'dotenv';

dotenv.config();

const importShoppingCartDAO = async () => {
  let ShoppingCartDAO;
  if (process.env.DATABASE as string === 'FIREBASE') {
    const { default: F } = await import('./shoppingCart/firebaseDB');
    ShoppingCartDAO = F;
  } else {
    const { default: M } = await import('./shoppingCart/mongoDB');
    ShoppingCartDAO = M;
  }
  return ShoppingCartDAO;
};

export const ShoppingCartDAO =  await importShoppingCartDAO();
