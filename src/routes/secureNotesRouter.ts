import { Router } from "express";

import * as secureNotesController from "../controllers/secureNotesController";
import * as secureNotesMiddleware from "../middlewares/secureNotesMiddleware";

const secureNotesRouter = Router();

secureNotesRouter.post("/secure-notes/create", secureNotesMiddleware.validateCreateSecureNotes, secureNotesController.createSecureNotes);
secureNotesRouter.get("/secure-notes", secureNotesController.getSecureNotes);
secureNotesRouter.delete("/secure-notes/:secureNotesId/delete", secureNotesController.deleteSecureNotes);

export default secureNotesRouter;