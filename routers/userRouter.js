import express from 'express'
import { login, persist, remove, retrieve, update } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", persist);

userRouter.post("/login", login);

userRouter.get("/", retrieve);

userRouter.put("/", update);

userRouter.delete("/:email", remove);

export default userRouter;