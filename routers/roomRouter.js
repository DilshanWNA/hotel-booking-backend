import express from 'express'
import { persist, remove, retrieve, update } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", persist);

roomRouter.get("/", retrieve);

roomRouter.put("/", update);

roomRouter.delete("/:number", remove);

export default roomRouter;