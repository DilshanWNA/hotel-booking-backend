import express from 'express'
import { login, persist, retrieve, update } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", persist);

userRouter.post("/login", login);

userRouter.get("/", retrieve);

userRouter.put("/", update)

export default userRouter;