import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// ---------------- UPDATE USER ----------------
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { username, email, password, avatar } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // ✅ Validate username
    if (username && username.length < 3) {
      return res
        .status(400)
        .json({ success: false, error: "Username must be at least 3 characters long" });
    }

    // ✅ Validate email
    if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ success: false, error: "Invalid email format" });
    }

    // ✅ Validate and hash password
    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ success: false, error: "Password must be at least 6 characters long" });
      }
      user.password = bcrypt.hashSync(password, 10);
    }

    // ✅ Apply updates
    if (username) user.username = username;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;

    await user.save();

    // ✅ Exclude password before sending response
    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Update User Error:", err.message);
    res.status(500).json({ success: false, error: "Failed to update user" });
  }
};



// ---------------- DELETE USER ----------------
export const deleteUser = async (req, res, next) => {
  try {
const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // ✅ Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully 🗑️",
    });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete user ❌",
    });
  }
};
