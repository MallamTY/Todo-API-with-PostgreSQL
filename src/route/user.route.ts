import express from "express";
import userControllelr from "../controller/user.controllelr";

const router = express.Router();

router.post('/register', userControllelr.Signup);



export default router;