import dbConnect from "../../mongoose";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    userId,
    first,
    last,
    pin,
    city,
    state,
    address,
    items,
    date,
    amount,
  } = req.body;
  const connection = await dbConnect();
  try {
    const placeOrder = await connection.connection.db
      .collection("users")
      .updateOne(
        { _id: ObjectId.createFromHexString(userId) },
        {
          $push: {
            orders: {
              id: new ObjectId(),
              firstName: first,
              lastName: last,
              pincode: pin,
              city: city,
              state: state,
              address: address,
              items: items,
              date: date,
              amount: amount,
            },
          },
        }
      );

    if (placeOrder.modifiedCount === 1) {
      res.status(200).json({ message: "OrderPlaced" });
    } else {
      res.status(400).json({ error: "Failed to place order" });
    }
  } catch (error) {
    console.error("Error placing order", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
