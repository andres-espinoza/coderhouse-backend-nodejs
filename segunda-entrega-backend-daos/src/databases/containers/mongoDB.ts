import { Model } from 'mongoose';
import { GenericDAO } from '../../types/genericDAO';

//El control de errores se realizará en los controllers

abstract class MongoDBContainer implements GenericDAO<any> {
  protected collection: Model<any>;

  constructor(mongoCollection: Model<any>) {
    this.collection = mongoCollection;
  }

  public async create(resource: any) {
    if (resource instanceof Array) await this.collection.insertMany(resource);
    else {
      const newItem = new this.collection(resource);
      await newItem.save();
    }
    return resource;
  }

  public async getById(id: string | number): Promise<any | null> {
    const searchedItem = await this.collection.findById(id);
    return searchedItem;
  }

  public async getAll(): Promise<any[]> {
    const items = await this.collection.find({});
    return items;
  }

  public async updateById(id: string, resource: any): Promise<string> {
    await this.collection.updateOne({ _id: id }, { $set: resource });
    return 'Succesfully updated';
  }

  public async deleteById(id: string): Promise<string> {
    await this.collection.deleteOne({ _id: id });
    return 'Succesfully deleted';
  }
}

export default MongoDBContainer;
