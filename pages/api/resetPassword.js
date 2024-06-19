import dbConnect from "../../mongoose";

export default async function handler(req, res) {
  const connection = await dbConnect();
  const { email, newPassword } = req.body;
  try {
    await connection.connection.db
      .collection("users")
      .updateOne({ email }, { $set: { password: newPassword } });
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
