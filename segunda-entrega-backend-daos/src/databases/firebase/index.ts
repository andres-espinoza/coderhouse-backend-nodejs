import * as admin from 'firebase-admin';
import path from 'path';
import { DBModels } from '../modelsNames';

const serviceAccount = require(path.join(__dirname, '..', '..', '..', 'firebase-key.json'));

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Connected to Firebase');
} catch (error) {
  console.error(`Error on connection to Firebase: ${error}`);
}

const firebaseDB = admin.firestore();
export const FirestoreServerValue = admin.database.ServerValue;
export const productFirebaseModel = firebaseDB.collection(DBModels.Product);
export const shoppingCartFirebaseModel = firebaseDB.collection(DBModels.ShopingCart);
