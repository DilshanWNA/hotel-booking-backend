import express from 'express'
import { persist, remove, retrieve, update } from '../controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/", persist);

eventRouter.get("/", retrieve);

eventRouter.put("/", update);

eventRouter.delete("/:name", remove);

export default eventRouter;