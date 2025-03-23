import Joi from "joi";

export const blogsShema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.any(),
    category: Joi.string().required(),
})