import { Types } from "mongoose";
import { Reviews } from "../services/reviewsServices.js";
import { v4 as uuidv4 } from 'uuid';
import HttpError from "../helper/HttpError.js";
import mongoose from "mongoose";


export async function getReviews(req, res) {
    try {
        const reviews = await Reviews.find();
        return res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}

export async function createReviews(req, res) {
    try {
        const { name, rating, description } = req.body;
        const createNewReviews = await Reviews.create({
            id: uuidv4(),
            name,
            rating,
            description,
        });

        return res.status(201).json(createNewReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}

export async function deleteReviews(req, res) {
    try {
        const { Types } = mongoose;
        const { id } = req.params;

        const valid = Types.ObjectId.isValid(id);
        if (!valid) {
            return res.status(404).json({ success: false, message: "Invalid ID format" });
        }

        const deletedReview = await Reviews.findOneAndDelete({ _id: id });

        if (!deletedReview) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        return res.status(200).json({ success: true, message: "Review deleted successfully", data: deletedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

