import dbConnect from "../../mongoose";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { userId, productId, category } = req.body;
  const connection = await dbConnect();
  if (!userId || !productId || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const user = await connection.connection.db
      .collection("users")
      .findOne({ _id: ObjectId.createFromHexString(userId) });
    const wishlist = user.wishlist;

    const wishlistItemExists = wishlist.some(
      (item) => item.productId.equals(productId) && item.category === category
    );

    // Log the result of the wishlist check

    if (wishlistItemExists) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
