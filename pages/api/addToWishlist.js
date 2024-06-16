import dbConnect from '../../mongoose';
import { ObjectId } from 'mongodb';


export default async function handler(req,res){
    const{category,productId,userId}=req.body;
    const connection=await dbConnect();

    try{
        const prodadd = await connection.connection.db.collection('users').updateOne(
            { _id: ObjectId.createFromHexString(userId) },
            { $push: { wishlist: {id:new ObjectId() ,productId:ObjectId.createFromHexString(productId),category:category } } }
        );

        if (prodadd.modifiedCount === 1) {
            res.status(200).json({ message: 'Product added to wishlist' });
          } else {
            res.status(400).json({ error: 'Failed to add product to wishlist' });
          }
    }
    catch(error){
        console.error('Error adding product to wishlist', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}