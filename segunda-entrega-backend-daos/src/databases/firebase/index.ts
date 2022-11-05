import admin from 'firebase-admin';
import { DBModels } from '../modelsNames';
import { default as key } from '../../../firebase-key.json';

const cert = key as admin.ServiceAccount;

try {
  admin.initializeApp({
    credential: admin.credential.cert(cert),
  });
  console.log('Connected to Firebase');
} catch (error) {
  console.error(`Error on connection to Firebase: ${error}`);
}

const firebaseDB = admin.firestore();
export const FirestoreServerValue = admin.database.ServerValue;
export const productFirebaseModel = firebaseDB.collection(DBModels.Product);
export const shoppingCartFirebaseModel = firebaseDB.collection(DBModels.ShopingCart);
