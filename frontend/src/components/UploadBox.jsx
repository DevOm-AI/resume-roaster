import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIPS = [
  'Parsing your career decisions...',
  'Scanning for delusion levels...',
  'Counting employment gaps...',
  'Reading "proficient in MS Word"...',
  'Consulting the roast oracle...',
  'Preparing surgical burns...',
  'AI is wheezing at your skills...',
];

export default function UploadBox({ onFileSelect, file, isLoading, error }) {
  const [dragging, setDragging] = useState(false);
  const [quipIdx, setQuipIdx]   = useState(0);
  const inputRef   = useRef(null);
  const intervalRef = useRef(null);

  if (isLoading && !intervalRef.current) {
    intervalRef.current = setInterval(() => setQuipIdx(i => (i + 1) % QUIPS.length), 2000);
  } else if (!isLoading && intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === 'application/pdf') onFileSelect(f);
  };

  const boxStyle = {
    border: `1.5px dashed ${dragging ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 16,
    minHeight: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: isLoading ? 'default' : 'pointer',
    transition: 'all 0.25s ease',
    background: dragging ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.02)',
    padding: '2rem',
  };

  return (
    <div>
      <div
        style={boxStyle}
        onClick={() => !isLoading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.background = 'rgba(139,92,246,0.06)'; }}}
        onMouseLeave={e => { if (!isLoading) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(139,92,246,0.02)'; }}}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}
            >
              <div style={{ position: 'relative', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#8b5cf6', borderRightColor: '#6366f1' }}
                />
                <span style={{ fontSize: 22 }}>🔥</span>
              </div>
              <div>
                <p style={{ color: '#f1f0ff', fontSize: '0.875rem', fontWeight: 600, marginBottom: 6 }}>
                  AI is roasting your resume...
                </p>
                <motion.p
                  key={quipIdx}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  style={{ color: '#7c7a9a', fontSize: '0.75rem', fontFamily: 'monospace' }}
                >
                  {QUIPS[quipIdx]}
                </motion.p>
              </div>
            </motion.div>
          ) : file ? (
            <motion.div key="file" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>📄</div>
              <div>
                <p style={{ color: '#f1f0ff', fontWeight: 600, fontSize: '0.875rem', fontFamily: 'Syne, sans-serif', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                <p style={{ color: '#7c7a9a', fontSize: '0.75rem', marginTop: 4 }}>{(file.size / 1024).toFixed(1)} KB · Click to change</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa', fontSize: '0.72rem', fontFamily: 'monospace' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', display: 'inline-block' }} />
                Ready to roast
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 56, height: 56, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}
              >📋</motion.div>
              <div>
                <p style={{ color: '#f1f0ff', fontWeight: 600, fontFamily: 'Syne, sans-serif' }}>Drop your resume here</p>
                <p style={{ color: '#7c7a9a', fontSize: '0.875rem', marginTop: 4 }}>or click to browse · PDF only</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['PDF', 'Max 10MB'].map(t => (
                  <span key={t} style={{ padding: '3px 10px', borderRadius: 6, fontSize: '0.72rem', fontFamily: 'monospace', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#3d3b55' }}>{t}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input ref={inputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => e.target.files[0] && onFileSelect(e.target.files[0])} />

      {error && (
        <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 12, fontSize: '0.8rem', fontFamily: 'monospace', display: 'flex', gap: 8, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
          <span>⚠</span><span>{error}</span>
        </div>
      )}
    </div>
  );
}