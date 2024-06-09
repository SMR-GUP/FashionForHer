import dbConnect from '../../mongoose';
import { ObjectId } from 'mongodb';

export default async function handler(req,res){
    const {userId}=req.body;
    const connection=await dbConnect();
    console.log(+userId+" called for emptying cart");
    try {
        const clearCart = await connection.connection.db.collection('users').updateOne(
            { _id: ObjectId.createFromHexString(userId) },
            { $pull: { cart: {$exists: true} } }
        );
    
        if (clearCart.modifiedCount === 0) {
            res.status(400).json({ error: 'Failed to empty cart' });

        } else {
            res.status(200).json({ message: 'Cart resetted' });

        }
      } catch (error) {
        console.error('Error in emptying cart', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}