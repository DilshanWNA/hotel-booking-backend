import express from 'express'
import { findByNumber, persist, remove, retrieve, update } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", persist);

roomRouter.get("/:number", findByNumber);

roomRouter.get("/", retrieve);

roomRouter.put("/", update);

roomRouter.delete("/:number", remove);

export default roomRouter;