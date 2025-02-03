import express from "express";
import validateBody from "../helper/validateBody.js";
import { messageToTelegram } from "../schemas/telegramSchemas.js";
import { postMessageToTelegram } from "../controllers/TelegramControllers.js";

const telegramRouter = express.Router();

telegramRouter.post('/', validateBody(messageToTelegram), postMessageToTelegram);

export default telegramRouter;