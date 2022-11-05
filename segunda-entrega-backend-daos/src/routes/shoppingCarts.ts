import { Router } from 'express';
// import ShoppingCartsMongoDAO from '../databases/daos/shoppingCart/mongoDB';
import ShoppingCartsFirebaseDAO from '../databases/daos/shoppingCart/firebaseDB';

const route = Router();

//* MongoDB
// route
//   .get('/:id/products', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const productsInCart = await ShoppingCartsMongoDAO.getById(id);
//       res.status(200).send(productsInCart);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
//   })
//   .post('/', async (req, res) => {
//     let newShoppingCart;
//     try {
//       const products: IProduct[] = req.body;
//       if (products.length < 1) {
//         newShoppingCart = await ShoppingCartsMongoDAO.create();
//       } else {
//         newShoppingCart = await ShoppingCartsMongoDAO.create({ products });
//       }
//       res.status(200).send(newShoppingCart);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
//   })
//   .put('/:id/products', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const products: string[] = req.body;
//       const message = await ShoppingCartsMongoDAO.updateById(id, products);
//       res.status(200).send(message);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
//   })
//   .delete('/:id/products/:prodId', async (req, res) => {
//     try {
//       const { id: cartId } = req.params;
//       const { prodId } = req.params;
//       const message = await ShoppingCartsMongoDAO.deleteProductById(cartId, prodId);
//       res.status(200).send(message);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
//   })
//   .delete('/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const message = await ShoppingCartsMongoDAO.deleteById(id);
//       res.status(200).send(message);
//     } catch (error) {
//       console.error(error);
//       res.sendStatus(500);
//     }
//   });

//* Firebase
route
  .get('/:id/products', async (req, res) => {
    try {
      const { id } = req.params;
      const productsInCart = await ShoppingCartsFirebaseDAO.getById(id);
      res.status(200).send(productsInCart);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .post('/', async (req, res) => {
    let newShoppingCart;
    try {
      //* Espero que lleguen solo los id's de los productos
      const products: string[] = req.body;
      if (products.length < 1) {
        newShoppingCart = await ShoppingCartsFirebaseDAO.create();
      } else {
        newShoppingCart = await ShoppingCartsFirebaseDAO.create({ products });
      }
      res.status(200).send(newShoppingCart);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .put('/:id/products', async (req, res) => {
    try {
      const { id } = req.params;
      const products: string[] = req.body;
      const message = await ShoppingCartsFirebaseDAO.updateById(id, products);
      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .delete('/:id/products/:prodId', async (req, res) => {
    try {
      const { id: cartId } = req.params;
      const { prodId } = req.params;
      const message = await ShoppingCartsFirebaseDAO.deleteProductById(cartId, prodId);
      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const message = await ShoppingCartsFirebaseDAO.deleteById(id);
      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

export default route;
