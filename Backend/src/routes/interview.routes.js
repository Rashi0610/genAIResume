import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/file.middleware.js";
import {generateAiReportController,generateResumePdfController} from "../controllers/interview.controller.js";

const router = Router();
/**
 *@route  post(api/interview/)
 *@description to send user resume and description along with job description and generate an interview report
 *@access private
 */


router.post("/generate-report",authMiddleware, upload.single("resume"), generateAiReportController);
router.post("/generate-resume-pdf",authMiddleware, upload.single("resume"), generateResumePdfController);

export default router;