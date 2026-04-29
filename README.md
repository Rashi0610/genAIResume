[README_AI_Resume_Analyzer.md](https://github.com/user-attachments/files/27193628/README_AI_Resume_Analyzer.md)
# 🧠 AI Resume Analyzer

An AI-powered full-stack web app that evaluates your resume against a job description and generates a structured readiness report — including interview questions, skill gap analysis, and a personalized preparation plan.

🔗 **Live Demo:** [gen-ai-resume.vercel.app](https://gen-ai-resume.vercel.app)

---

## ✨ Features

- 📄 **Resume vs JD Analysis** — Compares your resume against any job description and scores your readiness
- 🎯 **Role-Specific Interview Questions** — Generates questions tailored to the job, not generic ones
- 🔍 **Interviewer Intent Breakdown** — Explains *why* each question is being asked and what the interviewer is looking for
- 💡 **Model Answers** — Provides structured answers you can personalize and practice
- 📊 **Skill Gap Detection** — Identifies what's missing between your profile and the job requirements
- 📅 **Day-wise Prep Plan** — Builds a personalized preparation schedule based on your gaps

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| AI | Grok API |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A Grok API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Rashi0610/genAIResume.git
cd genAIResume
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
GROK_API_KEY=your_grok_api_key_here
PORT=5000
```

```bash
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

The app will run at `http://localhost:3000`

---

## 🧩 How It Works

1. User uploads or pastes their resume
2. User pastes the target job description
3. The backend sends both to the Grok API using structured prompt templates
4. The API returns a parsed report with scores, questions, gaps, and a prep plan
5. The frontend renders everything in a clean, readable format

---

## 📁 Project Structure

```
genAIResume/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   └── App.js
├── server/               # Express backend
│   ├── routes/           # API routes
│   ├── prompts/          # Grok prompt templates
│   └── index.js
└── README.md
```

---

## 🔑 Key Engineering Decisions

- **Structured prompt templates** — Carefully engineered prompts ensure consistent, parseable output from the AI regardless of resume format
- **Environment-based config** — API keys are managed via `.env` files, never hardcoded
- **CORS configuration** — Properly set up for cross-origin requests between Vercel and Render deployments

---

## 🌐 Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |

---

## 📬 Contact

**Rashi Shaha**
- GitHub: [@Rashi0610](https://github.com/Rashi0610)
- Email: rashishaha0610@gmail.com
- LinkedIn: [linkedin.com/in/rashishaha](https://linkedin.com/in/rashishaha)
