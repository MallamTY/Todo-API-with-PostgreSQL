import todoRoutes from "./todo.route";
import userRoutes from "./user.route";
import express from "express";

const router = express.Router();


router.use('/user', userRoutes);
router.use('/todo', todoRoutes);


export default router





