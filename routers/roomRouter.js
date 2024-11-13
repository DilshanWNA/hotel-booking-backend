import express from 'express'
import { persist, retrieve } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", persist);

roomRouter.get("/", retrieve);

export default roomRouter;