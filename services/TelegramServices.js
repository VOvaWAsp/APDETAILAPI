import { model, Schema } from "mongoose";

const telegramSchema = new Schema(
    // {
//     fullName: {
//         type: String,
//         required: [true, 'Set name for contact'],
//     },
//     email: {
//         type: String,
//     },
//     phone: {
//         type: Number,
//     },
//     location: {
//         type: String,
//     },
//     date: {
//         type: String,
//     },
// },
{
    encryptedData: {
        type: String
    }
},
{
    timestamps: true,
    versionKey: false,
});

export const Telegram = model("TelegramBooking", telegramSchema)