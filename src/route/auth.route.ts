import express from "express";
import { Auth } from "../controller";

const router = express.Router();

router.post('/login', Auth.logIn);

router.post('/refresh-token', Auth.refresh)


export default router;