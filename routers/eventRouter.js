import express from 'express'
import { persist, retrieve, update } from '../controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/", persist);

eventRouter.get("/", retrieve);

eventRouter.put("/", update);

export default eventRouter;