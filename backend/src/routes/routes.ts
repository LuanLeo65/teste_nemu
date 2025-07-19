//src/routes/routes.ts
import { Router } from "express";
import upload from "./middlewares";
import fileController from "../controller/journeys";

const router = Router();

router.get("/journeys", upload.single("file"), fileController.getJourneys);

export default router;
