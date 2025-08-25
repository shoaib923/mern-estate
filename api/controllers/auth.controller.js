import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, 
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "data saved successfully" });
  } catch (err) {
    next(errorHandler(550,'error from the function'));
    }
};
