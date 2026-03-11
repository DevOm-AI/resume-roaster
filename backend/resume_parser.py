"""
resume_parser.py
Handles PDF text extraction using PyPDF2.
"""

import PyPDF2
import io
from fastapi import HTTPException


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extract all text from a PDF file.

    Args:
        file_bytes: Raw bytes of the uploaded PDF file.

    Returns:
        Extracted text as a single string.

    Raises:
        HTTPException: If the PDF cannot be read or is empty.
    """
    try:
        reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))

        if len(reader.pages) == 0:
            raise HTTPException(status_code=400, detail="PDF has no pages.")

        text_parts = []
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text_parts.append(page_text)

        full_text = "\n".join(text_parts).strip()

        if not full_text:
            raise HTTPException(
                status_code=400,
                detail="Could not extract any text from the PDF. Make sure it's not a scanned image-only PDF."
            )

        return full_text

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse PDF: {str(e)}")
