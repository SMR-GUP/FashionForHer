import { ObjectId } from 'mongodb';
import dbConnect from '../../mongoose';


export default async function handler(req,res){
    const connection = await dbConnect();
    const{id}=req.query;
    try{

    if(id){
        const user = await connection.connection.db.collection('users').findOne({ _id: ObjectId.createFromHexString(id)});
        if(!user){
            return res.status(400).json({error:'user not found'});
        }
        
        else
        {
            return res.status(200).json({user});
        }
    }
}

catch(error)
{
    console.log("Errorrr getting detailss ",error);
}
}