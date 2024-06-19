import { ObjectId } from "mongodb";
import dbConnect from "../../mongoose";

export default async function handler(req, res) {
  const connection = await dbConnect();

  try {
    const { id } = req.query;

    if (id) {
      // Fetch a specific t-shirt by ID

      const footwear = await connection.connection.db
        .collection("footwear")
        .findOne({ _id: ObjectId.createFromHexString(id) });
      if (!footwear) {
        return res.status(404).json({ error: "Footwear not found" });
      }
      return res.status(200).json({ footwear });
    } else {
      // Fetch all t-shirts
      const footwears = await connection.connection.db
        .collection("footwear")
        .find({})
        .toArray();
      return res.status(200).json({ footwears });
    }
  } catch (error) {
    console.error("Error fetching footwears:", error);
    res.status(500).json({ error: "Error fetching footwears" });
  }
}
