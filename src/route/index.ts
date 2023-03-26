import todoRoutes from "./todo.route";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";
import express from "express";

const router = express.Router();


router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/todo', todoRoutes);


export default router





