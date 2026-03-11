"""
main.py
FastAPI backend for Resume Roaster.
"""

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from resume_parser import extract_text_from_pdf
from gemini import generate_roast

app = FastAPI(title="Resume Roaster API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Resume Roaster API is alive 🔥"}

@app.post("/roast")
async def roast_resume(
    file: UploadFile = File(...),
    language: str = Form(default="english")
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    if language.lower() not in ("english", "hindi"):
        language = "english"

    try:
        file_bytes = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not read file: {str(e)}")

    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    resume_text = extract_text_from_pdf(file_bytes)
    roast_text = generate_roast(resume_text, language=language)
    scores = parse_scores(roast_text)

    return JSONResponse(content={
        "roast": roast_text,
        "scores": scores,
        "language": language
    })


def parse_scores(roast_text: str) -> dict:
    import re
    scores = {
        "resume_strength": None,
        "buzzword_density": None,
        "confidence_gap": None,
        "recruiter_patience": None,
    }

    patterns = {
        "resume_strength":   r"Resume\s+Strength[^\d]*(\d+)\s*/\s*10",
        "buzzword_density":  r"Buzzword\s+Density[^\d]*(\d+)\s*/\s*10",
        "confidence_gap":    r"Confidence\s+vs\s+Skill\s+Gap[^\d]*(\d+)\s*/\s*10",
        "recruiter_patience": r"Recruiter\s+Patience\s+Remaining[^\d]*(\d+)\s*/\s*10",
    }

    for key, pat in patterns.items():
        match = re.search(pat, roast_text, re.IGNORECASE)
        if match:
            scores[key] = int(match.group(1))

    return scores