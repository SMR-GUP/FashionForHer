import dbConnect from "../../mongoose";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { userId, productId, category } = req.body;
  const connection = await dbConnect();
  try {
    const prodrem = await connection.connection.db
      .collection("users")
      .updateOne(
        { _id: ObjectId.createFromHexString(userId) },
        {
          $pull: {
            wishlist: { productId: ObjectId.createFromHexString(productId) },
          },
        }
      );

    if (prodrem.modifiedCount === 1) {
      res.status(200).json({ message: "Product removed from wishlist" });
    } else {
      res.status(400).json({ error: "Failed to remove product to wishlist" });
    }
  } catch (error) {
    console.error("Error removing from wishlist", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
