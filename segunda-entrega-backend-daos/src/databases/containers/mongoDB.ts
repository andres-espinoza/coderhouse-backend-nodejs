import { Model } from 'mongoose';
import { GenericDAO } from '../../types/genericDAO';

//El control de errores se realizará en los controllers

class MongoDBContainer implements GenericDAO<any> {
  readonly collection: Model<any>;

  constructor(mongoCollection: Model<any>) {
    this.collection = mongoCollection;
  }

  async create(resource: any) {
    const newItem = new this.collection(resource);
    await newItem.save();
    return resource;
  }

  async getById(id: string | number): Promise<any | null> {
    const searchedItem = await this.collection.findById(id);
    return searchedItem;
  }

  async getAll(): Promise<any[]> {
    const items = await this.collection.find({});
    return items;
  }

  async updateById(id: string, resource: any): Promise<any> {
    await this.collection.updateOne({ _id: id }, { $set: resource });
    return resource;
  }

  async deleteById(id: string): Promise<string> {
    await this.collection.deleteOne({ _id: id });
    return 'Succesfully deleted';
  }
}

export default MongoDBContainer;
