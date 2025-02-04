import CryptoJS from "crypto-js";
import { Telegram } from "../services/TelegramServices.js";
import axios from "axios";

const encryData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.SECRET_KEY).toString();
}

const decryData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

export async function postMessageToTelegram(req, res) {
    try {
        const { fullName, email, phone, location, date, typeOfWashing } = req.body;
        const encryptedData = encryData({ fullName, email, phone, location, date, typeOfWashing });

        const newForm = new Telegram({encryptedData});
        await newForm.save();

        const decryptedData = decryData(encryptedData)

        const telegramMessage = `🔒 Нова форма:\n👤 Name: ${decryptedData.fullName}\n📧 Email: ${decryptedData.email}\n💬 Phone: ${decryptedData.phone}\n📍 Location: ${decryptedData.location}\n⌚️ Date: ${decryptedData.date}\n✅ Type of washing: ${decryptedData.typeOfWashing}`;

        await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            chat_id: process.env.CHAT_ID,
            text: telegramMessage,
            parse_mode: "Markdown",
        });

        res.status(200).json({success: true, message: "Дані надішнлано"});
    } catch(error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
}