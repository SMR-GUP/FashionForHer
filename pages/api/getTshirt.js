import { ObjectId } from 'mongodb';
import dbConnect from '../../mongoose';

export default async function handler(req, res) {
  const connection = await dbConnect();

  try {

    const { id } = req.query;

    if (id) {
        // Fetch a specific t-shirt by ID

        const tshirt = await connection.connection.db.collection('tshirt').findOne({ _id: ObjectId.createFromHexString(id)});
        if (!tshirt) {
          return res.status(404).json({ error: 'T-shirt not found' });
        }
        return res.status(200).json({ tshirt });
      } else {
        // Fetch all t-shirts
        const tshirts = await connection.connection.db.collection('tshirt').find({}).toArray();
        return res.status(200).json({ tshirts });
      }
    } 
   catch (error) {
    console.error('Error fetching t-shirts:', error);
    res.status(500).json({ error: 'Error fetching t-shirts' });
  }
}
