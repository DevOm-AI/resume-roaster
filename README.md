# 🔥 Resume Roaster

> Upload your resume. Get brutally roasted by AI. No feelings spared.

A full-stack web app that extracts your resume PDF, sends it to Groq AI, and returns a **savage, emoji-heavy, section-by-section roast** — in English or Hindi.

---

## 📁 Project Structure

```
Resume Roaster/
├── backend/
│   ├── main.py              # FastAPI app & /roast endpoint
│   ├── gemini.py            # Groq AI integration + prompts
│   ├── resume_parser.py     # PDF text extraction with PyPDF2
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Your API key goes here
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api.js
        ├── index.css
        └── components/
            ├── UploadBox.jsx
            ├── LanguageToggle.jsx
            └── RoastResult.jsx
```

---

## ⚡ Quick Start

### 1. Get a FREE Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to **API Keys** → **Create API Key**
4. Copy your key

> Groq free tier gives **14,400 requests/day** — more than enough.

---

### 2. Backend Setup

```bash
cd "Resume Roaster/backend"

# Activate virtual environment
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Add your API key to .env
# Open .env and set:
# GROQ_API_KEY=your_key_here

# Start the server
uvicorn main:app --reload
```

Backend runs at: **http://127.0.0.1:8000**

---

### 3. Frontend Setup

```bash
cd "Resume Roaster/frontend"

npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔧 Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
```

---

## 🌐 API Reference

### `POST /roast`

| Field | Type | Value |
|-------|------|-------|
| `file` | File (PDF) | The resume to roast |
| `language` | string | `"english"` or `"hindi"` |

**Response:**
```json
{
  "roast": "🔥 FIRST IMPRESSION\n...",
  "scores": {
    "resume_strength": 3,
    "buzzword_density": 9,
    "confidence_gap": 8,
    "recruiter_patience": 2
  },
  "language": "english"
}
```

---

## ✨ Features

- 📄 **PDF Upload** — Drag & drop or click to upload
- 🔥 **AI Roast** — 8-section brutal roast with meme-worthy humor
- 🌍 **Dual Language** — English and Hindi roast modes
- 📊 **Roast Scorecard** — Resume Strength, Buzzword Density, Confidence vs Skill Gap, Recruiter Patience Left
- 📋 **Copy Roast** — One-click copy to clipboard
- 🐦 **Share** — Share to X (Twitter) and LinkedIn

---

## 🎭 Roast Sections

Every roast is structured into 8 sections:

1. **🔥 First Impression** — Dramatic first reaction
2. **📈 Skill Inflation Roast** — Mocks exaggerated or generic skills
3. **🧑‍💼 Recruiter Inner Thoughts** — What the recruiter secretly thinks
4. **🤖 ATS System Reaction** — The bot has opinions
5. **🎬 Meme Comparison** — Compared to something absurd
6. **💀 Brutal Reality Check** — Hard truths
7. **🏆 Final Verdict** — Dramatic closing summary
8. **📊 Roast Scorecard** — 4 metrics rated out of 10

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + Inline Styles |
| Animation | Framer Motion |
| HTTP | Axios |
| Backend | FastAPI + Python |
| AI Model | Groq — LLaMA 3.3 70B |
| PDF Parsing | PyPDF2 |

---

## 🚀 Running the Project

Always open **2 terminals**:

```bash
# Terminal 1 — Backend
cd "D:\Minor Projects\Resume Roaster\backend"
venv\Scripts\activate
uvicorn main:app --reload

# Terminal 2 — Frontend
cd "D:\Minor Projects\Resume Roaster\frontend"
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## ⚠️ Notes

- Only PDF files are supported
- Groq API calls typically take 3–8 seconds
- The app does **not** store any resume data
- Keep both terminals open while using the app

---

Made with 🔥 and zero mercy.
