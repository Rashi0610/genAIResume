import expressAsyncHandler from "express-async-handler";
import {PDFParse} from "pdf-parse";
import { generateInterviewReport, generateResumePdf } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReportModel.js";

export const generateAiReportController = expressAsyncHandler(async (req, resp) => {
    const resumeFile = req.file;

    if (!resumeFile) {
        resp.status(400);
        throw new Error("Resume file is required");
    }

    const resumeContent = await new PDFParse(resumeFile.buffer);
    const { selfdescription, jobdescription } = req.body;

    if (!selfdescription || !jobdescription) {
        resp.status(400);
        throw new Error("Self description and job description are required");
    }

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription: selfdescription,
        jobDescription: jobdescription
    });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resumetext: resumeContent.text,
        selfdescription: selfdescription,
        jobdescription: jobdescription,

        title: interviewReportByAI.title,
        matchScore: interviewReportByAI.matchScore,

        technicalquestions: interviewReportByAI.technicalQuestions || [],
        behavioralquestions: interviewReportByAI.behavioralQuestions || [],
        skillgaps: interviewReportByAI.skillGaps || [],
        preparationplan: interviewReportByAI.preparationPlan || [],

        rawAI: interviewReportByAI
    });

    resp.status(201).json({
        message: "Report Generated Successfully",
        interviewReport
    });
});

export const generateResumePdfController = expressAsyncHandler(async (req, resp) => {
    const resumeFile = req.file;

    if (!resumeFile) {
        resp.status(400);
        throw new Error("Resume file is required");
    }

    const resumeContent = await new PDFParse(resumeFile.buffer);
    const { selfdescription, jobdescription } = req.body;

    if (!selfdescription || !jobdescription) {
        resp.status(400);
        throw new Error("Self description and job description are required");
    }

    const pdfBuffer = await generateResumePdf({
        resume: resumeContent.text,
        selfDescription: selfdescription,
        jobDescription: jobdescription
    });

    resp.setHeader("Content-Type", "application/pdf");
    resp.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    resp.status(200).send(pdfBuffer);
});