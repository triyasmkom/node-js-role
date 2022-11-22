import express from "express";
import {Login,Logout, Me} from "../controller/AuthController.js";

const authRouter = express.Router();
authRouter.get('/me',Me);
authRouter.post('/login',Login);
authRouter.delete('/logout',Logout);
export default authRouter;