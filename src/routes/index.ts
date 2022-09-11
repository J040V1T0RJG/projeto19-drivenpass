import { Router } from "express";

import userRouter from "./userRouter";
import credentialRouter from "./credentialRouter";
import secureNotesRouter from "./secureNotesRouter";

const router = Router();

router.use(userRouter);
router.use(credentialRouter);
router.use(secureNotesRouter);

export default router;