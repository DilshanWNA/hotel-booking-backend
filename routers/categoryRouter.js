import express from 'express'
import { persist, retrieve, update } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/", persist);

categoryRouter.get("/", retrieve);

categoryRouter.put("/", update);

export default categoryRouter;