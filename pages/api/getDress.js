import { ObjectId } from "mongodb";
import dbConnect from "../../mongoose";

export default async function handler(req, res) {
  const connection = await dbConnect();

  try {
    const { id } = req.query;

    if (id) {
      // Fetch a specific t-shirt by ID

      const dress = await connection.connection.db
        .collection("dress")
        .findOne({ _id: ObjectId.createFromHexString(id) });
      if (!dress) {
        return res.status(404).json({ error: "Dress not found" });
      }
      return res.status(200).json({ dress });
    } else {
      // Fetch all t-shirts
      const dresses = await connection.connection.db
        .collection("dress")
        .find({})
        .toArray();
      return res.status(200).json({ dresses });
    }
  } catch (error) {
    console.error("Error fetching dresses:", error);
    res.status(500).json({ error: "Error fetching dresses" });
  }
}
