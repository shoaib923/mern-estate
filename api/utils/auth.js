import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to verify JWT token from header or cookie
export const verifyToken = async (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header or cookies
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.access_token) {
      token = req.cookies.access_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized: No token provided",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized: Invalid token",
      });
    }

    // 3️⃣ Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized: User not found",
      });
    }

    // 4️⃣ Attach user object to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Verify Token Error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Unauthorized: Token expired",
      });
    }

    res.status(401).json({
      success: false,
      error: "Unauthorized: Token verification failed",
    });
  }
};
