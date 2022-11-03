import * as admin from 'firebase-admin';
import { GenericDAO } from '../../types/genericDAO';

abstract class FirebaseDBContainer implements GenericDAO<any> {
  protected collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>;

  constructor(collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>) {
    this.collection = collection;
  }

  public async create(resource: any = null): Promise<any> {
    if (resource instanceof Array) {
      for (const item of resource) {
        await this.collection
          .doc()
          .set({ ...item, timestamp: admin.firestore.FieldValue.serverTimestamp() });
      }
    } else {
      await this.collection
        .doc()
        .set({ ...resource, timestamp: admin.firestore.FieldValue.serverTimestamp() });
    }
    return resource;
  }

  public async getAll(): Promise<any[]> {
    const { docs } = await this.collection.get();
    if (docs.length > 1) return docs.map((document) => ({ ...document.data(),  id: document.id }));
    return [];
  }

  public async getById(id: string): Promise<any> {
    const doc = await this.collection.doc(id).get();
    if (doc) return { id: doc.id, ...doc.data() };
    return null;
  }

  public async updateById(id: string, resource: any): Promise<string> {
    await this.collection.doc(id).update(resource);
    return 'Succesfully updated';
  }

  public async deleteById(id: string): Promise<string> {
    await this.collection.doc(id).delete();
    return 'Succesfully deleted';
  }
}

export default FirebaseDBContainer;
