import dbConnect from "../../mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { setToken, getToken } from "../../utils/auth";

export default async function handler(req, res) {
  const connection = await dbConnect();
  const { email, password } = req.body;
  dotenv.config();

  try {
    const user = await connection.connection.db
      .collection("users")
      .findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password === password) {
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
        expiresIn: "48h",
      });

      return res
        .status(200)
        .json({ message: "User authenticated successfully", token, user });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
