import express from "express";
import { Auth } from "../controller";

const router = express.Router();

router.post('/login', Auth.logIn);


export default router;