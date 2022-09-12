import { Router } from "express";

import userRouter from "./userRouter";
import credentialRouter from "./credentialRouter";
import secureNotesRouter from "./secureNotesRouter";
import cardRouter from "./cardRouter";

const router = Router();

router.use(userRouter);
router.use(credentialRouter);
router.use(secureNotesRouter);
router.use(cardRouter);

export default router;