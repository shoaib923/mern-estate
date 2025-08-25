import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

// ---------------- SIGNUP ----------------
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "Account created successfully 🎉" });
  } catch (err) {
    // Handle duplicate username/email
    if (err.code === 11000) {
      const duplicateFields = Object.keys(err.keyPattern); // e.g., ["email", "username"]
      const message = duplicateFields
        .map((f) => `${f} already in use`)
        .join(" & ");

      return next(errorHandler(409, message));
    }

    next(errorHandler(500, "Server error, please try again later."));
  }
};

// ---------------- SIGNIN ----------------
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    // Compare password
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid password"));

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Exclude password from response
    const { password: pwd, ...userData } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userData);
  } catch (error) {
    next(errorHandler(500, "Server error, please try again later."));
  }
};
