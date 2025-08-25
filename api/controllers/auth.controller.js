import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // 👈 MUST be "password"
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "data saved successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
