/** @format */

import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
   const client = await MongoClient.connect(
      'mongodb+srv://ben-next:yOLrmINVSBIuSYuK@cluster0.fkmsvrl.mongodb.net/portfolio?retryWrites=true&w=majority'
   );

   return client;
}
