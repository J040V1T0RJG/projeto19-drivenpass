import { Router } from "express";

import * as wifiController from "../controllers/wifiController";
import * as wifiMiddleware from "../middlewares/wifiMiddleware";

const wifiRouter = Router();

wifiRouter.post("/wifi/create", wifiMiddleware.validateCreateWifi, wifiController.createWifi);
wifiRouter.get("/wifi", wifiController.getWifi);
wifiRouter.delete("/wifi/:wifiId/delete", wifiController.deleteWifi);

export default wifiRouter;