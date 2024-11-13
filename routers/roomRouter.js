import express from 'express'
import { persist } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post("/", persist);

export default roomRouter;