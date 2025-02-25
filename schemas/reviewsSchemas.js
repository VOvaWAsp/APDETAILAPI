import Joi from "joi";

export const reviewsSchema = Joi.object({
    name: Joi.string().required(),
    rating: Joi.number().required(),
    description: Joi.string().required(),
})