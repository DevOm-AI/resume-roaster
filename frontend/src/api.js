/**
 * api.js
 * Handles all HTTP requests to the Resume Roaster backend.
 */

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Submit a resume PDF for roasting.
 * @param {File} file - The PDF file object from an input element.
 * @param {string} language - "english" or "hinglish"
 * @returns {Promise<{roast: string, scores: object, language: string}>}
 */
export async function roastResume(file, language = 'english') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('language', language);

  const response = await axios.post(`${BASE_URL}/roast`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000, // 60s — Gemini can be slow
  });

  return response.data;
}
