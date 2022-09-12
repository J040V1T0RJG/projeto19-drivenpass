import { Router } from "express";

import * as cardController from "../controllers/cardController";
import * as cardMiddleware from "../middlewares/cardMiddleware";

const cardRouter = Router();

cardRouter.post("/card/create", cardMiddleware.validateCreateCard, cardController.createCard);
cardRouter.get("/card", cardController.getCards);
cardRouter.delete("/card/:cardId/delete", cardController.deleteCard);

export default cardRouter;