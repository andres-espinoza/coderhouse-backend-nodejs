import moongose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongodbConnection = () => moongose
  .connect(process.env.MONGO_CONNECTION as string)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((e: Error) => console.log(`Error on connection to MongoDB Atlas: ${e?.message}`));

export default mongodbConnection;

