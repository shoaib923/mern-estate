import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ success: true, message: "Account created successfully 🎉" });
  } catch (err) {
    if (err.code === 11000) {
      // Get all fields that caused duplicate error
      const duplicateFields = Object.keys(err.keyPattern); // e.g., ["email", "username"]
      const message = duplicateFields.map(f => `${f} already in use`).join(" & ");

      return next(errorHandler(409, message));
    }

    next(errorHandler(500, "Server error, please try again later."));
  }
};
