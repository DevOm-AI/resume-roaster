import { useState } from 'react';
import { motion } from 'framer-motion';

const SCORES = [
  { key: 'resume_strength',   label: 'Resume Strength',        icon: '📄', color: '#6366f1', track: 'rgba(99,102,241,0.15)' },
  { key: 'buzzword_density',  label: 'Buzzword Density',       icon: '🤡', color: '#f59e0b', track: 'rgba(245,158,11,0.15)' },
  { key: 'confidence_gap',    label: 'Confidence vs Skill',    icon: '📈', color: '#ec4899', track: 'rgba(236,72,153,0.15)' },
  { key: 'recruiter_patience',label: 'Recruiter Patience Left',icon: '😮', color: '#8b5cf6', track: 'rgba(139,92,246,0.15)' },
];

function ScoreCard({ label, icon, value, color, track, delay }) {
  const pct = value != null ? (value / 10) * 100 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      style={{ flex: 1, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', minWidth: 130 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.85rem' }}>{icon}</span>
          <span style={{ color: '#7c7a9a', fontSize: '0.7rem', fontFamily: 'monospace' }}>{label}</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          style={{ color, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}
        >
          {value != null ? `${value}/10` : '—'}
        </motion.span>
      </div>
      <div style={{ height: 5, borderRadius: 999, overflow: 'hidden', background: track }}>
        <motion.div
          style={{ height: '100%', borderRadius: 999, background: color, width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

// Section header keywords — English + Hindi
const HEADER_KEYWORDS = [
  'FIRST IMPRESSION', 'SKILL INFLATION', 'RECRUITER INNER', 'ATS SYSTEM',
  'MEME COMPARISON', 'BRUTAL REALITY', 'FINAL VERDICT', 'ROAST SCORE',
  'ROAST SCORECARD',
  'PEHLI NAZAR', 'SKILL KA HUNGAMA', 'RECRUITER KE MANN', 'ATS MACHINE',
  'MEME COMPARISON', 'KADWA SACH', 'ANTIM FAISLA', 'ROAST KA SCORECARD',
];

function isSectionHeader(line) {
  const t = line.trim();
  if (!t || t.length > 120) return false;
  if (!/^\p{Emoji}/u.test(t)) return false;
  const upper = t.toUpperCase();
  return HEADER_KEYWORDS.some(k => upper.includes(k));
}

function isScoreLine(line) {
  return /\d\/10/.test(line) &&
    /resume strength|buzzword|confidence|recruiter patience|skill gap|aukaat|scorecard/i.test(line);
}

function formatRoast(text) {
  if (!text) return '<p style="color:#7c7a9a;padding:1rem 0">No content received.</p>';

  return text.split('\n').map(line => {
    const t = line.trim();
    if (!t) return '<div style="height:6px"></div>';

    if (isSectionHeader(t)) {
      return `<div style="
        display:block;
        font-family:Syne,sans-serif;
        font-weight:700;
        font-size:0.78rem;
        letter-spacing:0.1em;
        text-transform:uppercase;
        color:#a78bfa;
        margin-top:1.5rem;
        margin-bottom:0.5rem;
        padding:0.3rem 0.75rem;
        background:rgba(139,92,246,0.08);
        border-left:2px solid #7c3aed;
        border-radius:0 4px 4px 0;
      ">${t}</div>`;
    }

    if (isScoreLine(t)) {
      return `<div style="padding:2px 0 4px 0">
        <span style="
          font-family:JetBrains Mono,monospace;
          font-size:0.75rem;
          padding:3px 10px;
          border-radius:4px;
          background:rgba(139,92,246,0.1);
          color:#a78bfa;
          display:inline-block;
        ">${t}</span>
      </div>`;
    }

    return `<p style="
      color:#b8b6d0;
      line-height:1.8;
      font-size:0.875rem;
      padding:1px 0;
      font-family:Instrument Sans,sans-serif;
    ">${t}</p>`;
  }).join('');
}

export default function RoastResult({ roast, scores, language, onReset }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(roast); }
    catch {
      const el = Object.assign(document.createElement('textarea'), { value: roast });
      document.body.appendChild(el); el.select(); document.execCommand('copy'); el.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!roast) {
    return (
      <div style={{ color: '#7c7a9a', textAlign: 'center', padding: '2rem' }}>
        <p>No roast content received. Try again.</p>
        <button onClick={onReset} style={{ marginTop: '1rem', color: '#a78bfa', cursor: 'pointer', background: 'none', border: 'none', fontSize: '0.875rem' }}>↩ Try Again</button>
      </div>
    );
  }

  const hasScores = scores && Object.values(scores).some(v => v != null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
          >💀</motion.div>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', color: '#f1f0ff', fontWeight: 700, fontSize: '1rem', margin: 0 }}>Roast Complete</p>
            <p style={{ color: '#3d3b55', fontSize: '0.72rem', fontFamily: 'monospace', margin: 0 }}>
              {language === 'hindi' ? '🇮🇳 Hindi Mode' : '🇬🇧 English Mode'} · No survivors
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#7c7a9a', padding: '8px 14px', borderRadius: 8, fontSize: '0.72rem', fontFamily: 'monospace', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'; e.currentTarget.style.color = '#c4b5fd'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#7c7a9a'; }}
        >↩ Roast Another</button>
      </div>

      {/* Score cards */}
      {hasScores && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {SCORES.map((s, i) => (
            <div key={s.key} style={{ flex: 1, minWidth: 130 }}>
              <ScoreCard {...s} value={scores[s.key]} delay={0.08 * i} />
            </div>
          ))}
        </div>
      )}

      {/* Roast text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(99,102,241,0.5), transparent)' }} />
        <div style={{ padding: '1.5rem' }} dangerouslySetInnerHTML={{ __html: formatRoast(roast) }} />
      </motion.div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={copy} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', background: copied ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.07)'}`, color: copied ? '#4ade80' : '#7c7a9a' }}>
          {copied ? '✓ Copied!' : '⎘ Copy Roast'}
        </button>
        <button
          onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Just got my resume ROASTED by AI 🔥💀 Absolutely brutal!')}`, '_blank')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#7c7a9a' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(29,155,240,0.4)'; e.currentTarget.style.color = '#38bdf8'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#7c7a9a'; }}
        >𝕏 Share</button>
        <button
          onClick={() => window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://resumeroaster.app', '_blank')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#7c7a9a' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(10,102,194,0.4)'; e.currentTarget.style.color = '#60a5fa'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#7c7a9a'; }}
        >in LinkedIn</button>
      </div>
    </motion.div>
  );
}