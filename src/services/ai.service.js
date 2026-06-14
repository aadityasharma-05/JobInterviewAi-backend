
// const { GoogleGenAI } = require("@google/genai")
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")
// const puppeteer = require("puppeteer")


// // const ai = new GoogleGenAI({
// //     apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY
// // })

// const Groq = require("groq-sdk");

// const groq = new Groq({
//     apiKey: process.env.GROQ_API_KEY
// });
// // console.log(
// //   "API KEY LOADED:",
// //   process.env.GEMINI_API_KEY
// //     ? process.env.GEMINI_API_KEY.substring(0, 15)
// //     : "UNDEFINED"
// // );
//  /**
//  * Helper to safely extract text from the Gemini API response.
//  * Handles both property and method forms across SDK versions.
//  */
// function extractResponseText(response) {
//     // In @google/genai v1.x, response.text is a string property
//     if (typeof response.text === "string") {
//         return response.text
//     }
//     // Fallback: try calling it as a function (older SDK)
//     if (typeof response.text === "function") {
//         return response.text()
//     }
//     // Last resort: try candidates array
//     const candidate = response.candidates?.[0]
//     const part = candidate?.content?.parts?.[0]
//     return part?.text || ""
// }

// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

//     const prompt = `Generate an interview report for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
// `

//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         }
//     })

//     const rawText = extractResponseText(response)

//     if (!rawText) {
//         throw new Error("Empty response from AI model")
//     }

//     return JSON.parse(rawText)
// }


// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: ["--no-sandbox", "--disable-setuid-sandbox"]
//     })
//     const page = await browser.newPage()
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4",
//         margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {

//     const resumePdfSchema = z.object({
//         html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })

//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `

//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(resumePdfSchema),
//         }
//     })

//     const rawText = extractResponseText(response)

//     if (!rawText) {
//         throw new Error("Empty response from AI model")
//     }

//     const jsonContent = JSON.parse(rawText)
//     const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

//     return pdfBuffer
// }

// module.exports = { generateInterviewReport, generateResumePdf }

console.log("🔥 USING GROQ AI SERVICE 🔥");
console.log("GROQ KEY:", process.env.GROQ_API_KEY?.substring(0, 10));


const Groq = require("groq-sdk");
const puppeteer = require("puppeteer");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
}) {

//     const prompt = `
// Generate a JSON response only.

// Candidate Resume:
// ${resume}

// Candidate Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}

// Return ONLY valid JSON in this format:

// {
//   "title": "Job Title",
//   "matchScore": 85,
//   "technicalQuestions": [
//     {
//       "question": "",
//       "intention": "",
//       "answer": ""
//     }
//   ],
//   "behavioralQuestions": [
//     {
//       "question": "",
//       "intention": "",
//       "answer": ""
//     }
//   ],
//   "skillGaps": [
//     {
//       "skill": "",
//       "severity": "low"
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "",
//       "tasks": ["", ""]
//     }
//   ]
// }
// `;
const prompt = `
You are an expert Technical Interview Coach, ATS Resume Reviewer, and Career Mentor.

Analyze the candidate profile and job description carefully.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

Generate a comprehensive interview preparation report.

Rules:

1. Calculate a realistic matchScore from 0-100.

2. Generate EXACTLY 5 strengths.

3. Generate EXACTLY 5 weaknesses.

4. Generate EXACTLY 5 ATS resume improvement suggestions.

5. Generate EXACTLY 10 technical interview questions.
For each question provide:
- question
- intention
- detailed answer (minimum 100 words)

6. Generate EXACTLY 10 behavioral interview questions.
For each question provide:
- question
- intention
- detailed answer using STAR method.

7. Generate at least 5 skill gaps.
Severity must be:
- low
- medium
- high

8. Generate a complete 30-day preparation plan.

For each day include:
- day
- focus
- studyHours
- 5 tasks minimum

9. Tailor everything to the target job description.

10. Questions should increase in difficulty.

11. Include:
- frontend concepts
- backend concepts
- databases
- system design
- problem solving
- behavioral preparation

12. Return ONLY valid JSON.

13. Do not wrap response in markdown.

JSON Format:

{
  "title": "",
  "matchScore": 0,

  "strengths": [
    ""
  ],

  "weaknesses": [
    ""
  ],

  "atsSuggestions": [
    ""
  ],

  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "skillGaps": [
    {
      "skill": "",
      "severity": "low"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "studyHours": 3,
      "tasks": [
        ""
      ]
    }
  ]
}
`;
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.7,
        response_format: {
            type: "json_object",
        },
    });

    const responseText =
        completion.choices[0].message.content;

    return JSON.parse(responseText);
}

async function generatePdfFromHtml(htmlContent) {

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
        ],
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm",
        },
    });

    await browser.close();

    return pdfBuffer;
}

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
}) {

    const prompt = `
Create a professional ATS-friendly resume.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY valid JSON:

{
  "html": "<html>...</html>"
}
`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.7,
        response_format: {
            type: "json_object",
        },
    });

    const responseText =
        completion.choices[0].message.content;

    const jsonContent = JSON.parse(responseText);

    const pdfBuffer = await generatePdfFromHtml(
        jsonContent.html
    );

    return pdfBuffer;
}

module.exports = {
    generateInterviewReport,
    generateResumePdf,
};