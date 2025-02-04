import Joi from "joi";

export const messageToTelegram = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    location: Joi.string().required(),
    date: Joi.string().required(),
    typeOfWashing: Joi.string().required()
})