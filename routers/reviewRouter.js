import express from 'express'
import { persist, remove, retrieve, update } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/", persist);

reviewRouter.get("/", retrieve);

reviewRouter.put("/", update);

reviewRouter.delete("/:id", remove);

export default reviewRouter;
