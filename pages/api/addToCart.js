import dbConnect from '../../mongoose';
import { ObjectId } from 'mongodb';

export default async function handler(req,res){
    const {userId,heading,size,image,price,productId,category}=req.body;
    const connection=await dbConnect();
    try {
        const prodadd = await connection.connection.db.collection('users').updateOne(
            { _id: ObjectId.createFromHexString(userId) },
            { $push: { cart: {id:new ObjectId() ,productId:ObjectId.createFromHexString(productId),category:category, heading: heading, size: size,image:image,price:price } } }
        );
    
        if (prodadd.modifiedCount === 1) {
          res.status(200).json({ message: 'Product added to cart' });
        } else {
          res.status(400).json({ error: 'Failed to add product to cart' });
        }
      } catch (error) {
        console.error('Error adding product to cart', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}