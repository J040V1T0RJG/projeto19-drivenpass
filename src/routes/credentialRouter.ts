import { Router } from "express";

import * as credentialController from "../controllers/credentialController";
import * as credentialMiddleware from "../middlewares/credentialMiddleware";

const credentialRouter = Router();

credentialRouter.post("/credential/create", credentialMiddleware.validateCreateCredential, credentialController.createCredential);
credentialRouter.get("/credential", credentialController.getCredentials);
credentialRouter.delete("/credential/:id/delete", credentialController.deleteCredential);

export default credentialRouter;