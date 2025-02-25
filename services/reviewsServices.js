import { model, Schema } from "mongoose";

const reviewsSchema = new Schema({
    name: {
        type: String,
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
    },
},
{
    timestamps: true,
    versionKey: false,
});

export const Reviews = model('Reviews', reviewsSchema)