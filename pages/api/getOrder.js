import { ObjectId } from "mongodb";
import dbConnect from "../../mongoose";

export default async function handler(req, res) {
  const connection = await dbConnect();
  const { id } = req.query;
  try {
    if (id) {
      const user = await connection.connection.db
        .collection("users")
        .findOne({ _id: ObjectId.createFromHexString(id) });
      if (!user) {
        return res.status(400).json({ error: "user not found" });
      } else {
        const orders = user.orders;
        return res.status(200).json({ orders });
      }
    }
  } catch (error) {
    console.log("Error getting details", error);
  }
}
