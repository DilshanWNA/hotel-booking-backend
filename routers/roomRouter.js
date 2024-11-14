import express from 'express'
import { findByCategory, findByNumber, persist, remove, retrieve, update } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", persist);

roomRouter.get("/number/:number", findByNumber);

roomRouter.get("/category/:category", findByCategory);

roomRouter.get("/", retrieve);

roomRouter.put("/", update);

roomRouter.delete("/:number", remove);

export default roomRouter;