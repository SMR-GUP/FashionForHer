import { ObjectId } from 'mongodb';
import dbConnect from '../../mongoose';

export default async function handler(req, res) {
  const connection = await dbConnect();

  try {

    const { id } = req.query;

    if (id) {
        // Fetch a specific t-shirt by ID

        const bottomwear = await connection.connection.db.collection('bottomwear').findOne({ _id: ObjectId.createFromHexString(id)});
        if (!bottomwear) {
          return res.status(404).json({ error: 'Bottomwear not found' });
        }
        return res.status(200).json({ bottomwear });
      } else {
        // Fetch all t-shirts
        const bottomwears = await connection.connection.db.collection('bottomwear').find({}).toArray();
        return res.status(200).json({ bottomwears });
      }
    } 
   catch (error) {
    console.error('Error fetching bottomwears:', error);
    res.status(500).json({ error: 'Error fetching bottomwears' });
  }
}
