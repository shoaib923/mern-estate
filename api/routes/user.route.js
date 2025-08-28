import express from "express";
import { updateUser, deleteUser } from "../controllers/User.controller.js";

const router = express.Router();

// Update user
router.put("/update/:userId", updateUser);

// Delete user
router.delete("/delete/:userId", deleteUser);

export default router;
