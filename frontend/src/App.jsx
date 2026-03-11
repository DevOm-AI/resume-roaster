import { useState } from 'react';
import { motion } from 'framer-motion';
import UploadBox from './components/UploadBox';
import RoastResult from './components/RoastResult';
import LanguageToggle from './components/LanguageToggle';
import { roastResume } from './api';

export default function App() {
  const [file, setFile]         = useState(null);
  const [language, setLanguage] = useState('english');
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState('');

  const handleRoast = async () => {
    if (!file) { setError('Please upload a PDF resume first!'); return; }
    setError(''); setLoading(true); setResult(null);
    try {
      const data = await roastResume(file, language);
      setResult(data);
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || 'Something went wrong. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setResult(null); setFile(null); setError(''); };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #050508 0%, #0a0a14 50%, #050508 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 1rem',
      fontFamily: 'Instrument Sans, DM Sans, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background glow orbs */}
      <div style={{ position: 'fixed', top: -200, left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Grid pattern */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ width: '100%', maxWidth: 560, position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          {/* Fire icon */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 64, height: 64, borderRadius: 16, fontSize: 28,
              background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.1))',
              border: '1px solid rgba(139,92,246,0.25)',
              boxShadow: '0 0 40px rgba(139,92,246,0.15)',
              marginBottom: '1.25rem',
            }}
          >🔥</motion.div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '0.75rem',
            fontFamily: 'Syne, sans-serif',
            letterSpacing: '-0.02em',
          }}>
            <span style={{ background: 'linear-gradient(135deg, #c4b5fd, #818cf8, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Resume</span>
            {' '}
            <span style={{ color: '#f1f0ff' }}>Roaster</span>
          </h1>

          {/* Subtitle */}
          <p style={{ color: '#7c7a9a', fontSize: '1rem', lineHeight: 1.6, maxWidth: 360, margin: '0 auto 1.25rem' }}>
            Upload your resume and get{' '}
            <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 600 }}>brutally roasted</span>
            {' '}by AI. No sugarcoating. 💀
          </p>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['⚡', 'Powered by Groq AI'], ['🔒', 'No data stored'], ['🌍', 'EN + Hindi']].map(([icon, label]) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 999, fontSize: '0.72rem',
                fontFamily: 'monospace', color: '#7c7a9a',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── MAIN CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: 'rgba(255,255,255,0.028)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20,
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(99,102,241,0.6), transparent)' }} />

          {result ? (
            <RoastResult roast={result.roast} scores={result.scores} language={result.language} onReset={handleReset} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              <UploadBox onFileSelect={(f) => { setFile(f); setError(''); }} file={file} isLoading={loading} error={error} />

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#3d3b55', letterSpacing: '0.1em', textTransform: 'uppercase' }}>configure</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
              </div>

              <LanguageToggle language={language} onChange={setLanguage} />

              {/* CTA Button */}
              <motion.button
                onClick={handleRoast}
                disabled={loading || !file}
                whileHover={!loading && file ? { scale: 1.015 } : {}}
                whileTap={!loading && file ? { scale: 0.985 } : {}}
                style={{
                  width: '100%', padding: '1rem',
                  borderRadius: 12, fontWeight: 700, fontSize: '0.95rem',
                  letterSpacing: '0.02em', border: 'none',
                  fontFamily: 'Syne, sans-serif',
                  cursor: loading || !file ? 'not-allowed' : 'pointer',
                  background: loading || !file
                    ? 'rgba(255,255,255,0.04)'
                    : 'linear-gradient(135deg, #7c3aed, #6366f1, #4f46e5)',
                  color: loading || !file ? '#3d3b55' : '#fff',
                  boxShadow: !loading && file ? '0 8px 32px rgba(99,102,241,0.3)' : 'none',
                  transition: 'all 0.2s',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', fontSize: '1rem' }}>⚙</motion.span>
                    Generating Roast...
                  </span>
                ) : '🔥 Roast My Resume'}
              </motion.button>

              {!file && !loading && (
                <p style={{ textAlign: 'center', fontSize: '0.72rem', fontFamily: 'monospace', color: '#3d3b55' }}>
                  Upload a PDF resume above to get started
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: '0.7rem', fontFamily: 'monospace', color: '#2a2840', marginTop: '1.5rem' }}>
          Made with 🔥 and zero mercy · Your resume never leaves your session
        </p>
      </div>
    </div>
  );
}