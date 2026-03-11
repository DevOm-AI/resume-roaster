import { motion } from 'framer-motion';

const options = [
  { value: 'english', label: 'English', flag: '🇬🇧', sub: 'Classic Savage' },
  { value: 'hindi',   label: 'Hindi',   flag: '🇮🇳', sub: 'Kadak Roast' },
];

export default function LanguageToggle({ language, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3d3b55' }}>
        Roast Language
      </label>
      <div style={{ display: 'flex', padding: 4, borderRadius: 14, gap: 4, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {options.map((opt) => {
          const active = language === opt.value;
          return (
            <motion.button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 10, padding: '10px 16px', borderRadius: 10,
                border: active ? '1px solid rgba(139,92,246,0.35)' : '1px solid transparent',
                background: active ? 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.15))' : 'transparent',
                color: active ? '#fff' : '#7c7a9a',
                cursor: 'pointer', transition: 'all 0.2s ease',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{opt.flag}</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.2 }}>{opt.label}</span>
                <span style={{ fontSize: '0.7rem', lineHeight: 1.2, color: active ? '#c4b5fd' : '#3d3b55' }}>{opt.sub}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}