import Groq from "groq-sdk";
import { z } from "zod";
import puppeteer from "puppeteer";

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),
    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.enum(["low", "medium", "high"])
    })),
    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string())
    })),
    title: z.string()
});

export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate a detailed interview preparation report for the following candidate.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY a valid JSON object with this exact structure:
{
  "title": "job title string",
  "matchScore": number between 0 and 100,
  "technicalQuestions": [
    { "question": "string", "intention": "string", "answer": "string" }
  ],
  "behavioralQuestions": [
    { "question": "string", "intention": "string", "answer": "string" }
  ],
  "skillGaps": [
    { "skill": "string", "severity": "low" | "medium" | "high" }
  ],
  "preparationPlan": [
    { "day": number, "focus": "string", "tasks": ["string", "string"] }
  ]
}`;

    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: "You are an expert technical recruiter and interview coach. Always respond with valid JSON only — no markdown, no explanation, no code fences."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        response_format: { type: "json_object" }, // enforces JSON just like Gemini's responseMimeType
        temperature: 0.7,
    });

    const rawText = response.choices[0].message.content.trim();

    // Strip markdown fences just in case
    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();

    // Validate with zod
    return interviewReportSchema.parse(JSON.parse(cleaned));
}


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();
    return pdfBuffer;
}

export async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate a tailored resume in HTML format for the following candidate.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Requirements:
- Tailor the resume specifically for the given job description
- Highlight the most relevant skills and experience
- Make it ATS-friendly and easily parsable
- Keep it 1-2 pages when converted to PDF
- Use clean professional formatting with subtle colors or font styles
- Do NOT make it sound AI-generated — keep it natural and human-like
- Focus on quality over quantity

Return ONLY a valid JSON object in this exact format:
{ "html": "<full HTML string here>" }`;

    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: "You are a professional resume writer. Always respond with valid JSON only — no markdown, no explanation, no code fences."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
    });

    const rawText = response.choices[0].message.content.trim();
    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();

    const jsonContent = JSON.parse(cleaned);
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

    return pdfBuffer;
}