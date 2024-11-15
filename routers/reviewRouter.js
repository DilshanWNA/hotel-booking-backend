import express from 'express'
import { persist, retrieve, update } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post("/", persist);

reviewRouter.get("/", retrieve);

reviewRouter.put("/", update);

export default reviewRouter;
