//src/routes/routes.ts
import { Router } from "express";
import fileController from "../controller/journeys";

const router = Router();

router.get("/journeys", fileController.getJourneys);

export default router;
