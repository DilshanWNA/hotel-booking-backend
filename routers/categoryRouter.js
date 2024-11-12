import express from 'express'
import { findByName, persist, remove, retrieve, update } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", persist);

categoryRouter.get("/:name", findByName);

categoryRouter.get("/", retrieve);

categoryRouter.put("/", update);

categoryRouter.delete("/:name", remove);

export default categoryRouter;