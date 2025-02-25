import express from "express";
import validateBody from "../helper/validateBody.js";
import { reviewsSchema } from "../schemas/reviewsSchemas.js";
import { createReviews, deleteReviews, getReviews } from "../controllers/ReviewsControllers.js";

const reviewsRouter = express.Router()

reviewsRouter.post('/', validateBody(reviewsSchema), createReviews);
reviewsRouter.get('/', getReviews);
reviewsRouter.delete('/:id', deleteReviews)

export default reviewsRouter;