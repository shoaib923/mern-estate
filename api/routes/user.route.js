import express from "express";

import { updateUser } from "../controllers/User.controller.js";

const router=express.Router();


router.put('/update/:userId',updateUser);


export default router;