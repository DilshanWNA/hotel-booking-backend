import express from 'express'
import { persist, retrieve, update } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", persist);

roomRouter.get("/", retrieve);

roomRouter.put("/", update);

export default roomRouter;