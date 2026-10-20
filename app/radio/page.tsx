"use client";
import { useEffect, useRef, useState } from 'react';
import { Fraunces, Tiro_Devanagari_Hindi } from 'next/font/google';
import {
  Play, Pause, Radio, Languages, GraduationCap, ArrowRight, Loader2, Sun, Moon,
  MapPin, Droplets, Wind, Thermometer, Newspaper, ExternalLink, Lock, LogIn, Clock,
} from 'lucide-react';
import { useDarkMode } from '@/lib/DarkModeContext';

const display = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'] });
const deva = Tiro_Devanagari_Hindi({ subsets: ['devanagari', 'latin'], weight: '400' });

const MAIN_SITE = 'https://vartalang.in';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// Radio Browser: the open, community directory behind most "open radio" apps
const RB_API = 'https://all.api.radio-browser.info/json';

// Guest limit: 5 minutes of actual listening, then login is required
const FREE_SECONDS = 300;
const FREE_KEY = 'gauraiyya_free_seconds';
const getToken = () => {
  try { return localStorage.getItem('token'); } catch { return null; }
};
const fmtLeft = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const DEFAULT_COORDS = { lat: 28.6139, lon: 77.209 }; // Delhi, used only if location can't be found at all

// One station per tick on the wire.
// `queries`: names searched in the directory (India only), tried in order.
// `lang`: Radio Browser language name, used as a fallback if no named station plays.
// `code`: BCP-47 locale, used for the date, numbers and place names.
// `urls`: optional hand-picked stream URLs (from openradio.space etc.), always tried first.
type Station = { id: string; native: string; language: string; name: string; code: string; queries: string[]; lang: string; urls?: string[]; anyCountry?: boolean };
const stations: Station[] = [
  { id: 'hi', native: 'हिंदी', language: 'Hindi', name: 'Radio Mirchi', code: 'hi-IN', queries: ['Radio Mirchi Mumbai', 'Mirchi 98.3', 'Radio Mirchi Hindi', 'Radio Mirchi'], lang: 'hindi' },
  { id: 'ta', native: 'தமிழ்', language: 'Tamil', name: 'Suryan FM', code: 'ta-IN', queries: ['Suryan FM'], lang: 'tamil' },
  { id: 'te', native: 'తెలుగు', language: 'Telugu', name: 'Telugu FM', code: 'te-IN', queries: ['Radio Mirchi Telugu', 'Radio City Telugu'], lang: 'telugu' },
  { id: 'kn', native: 'ಕನ್ನಡ', language: 'Kannada', name: 'Kannada FM', code: 'kn-IN', queries: ['Radio City Kannada', 'Radio Mirchi Kannada'], lang: 'kannada' },
  { id: 'ml', native: 'മലയാളം', language: 'Malayalam', name: 'Radio Mango', code: 'ml-IN', queries: ['Radio Mango 91.9', 'Club FM 94.3', 'Red FM 93.5', 'Radio Mirchi Malayalam', 'Hit 96.7', 'Radio Mango', 'Club FM Malayalam'], lang: 'malayalam', anyCountry: true },
  { id: 'bn', native: 'বাংলা', language: 'Bengali', name: 'Bangla radio', code: 'bn-IN', queries: ['Red FM Bangla', 'Mirchi Bangla', 'Radio Mirchi Kolkata', 'AIR Kolkata', 'Big FM Kolkata', 'Friends FM', 'Bangla'], lang: 'bengali', anyCountry: true },
  { id: 'mr', native: 'मराठी', language: 'Marathi', name: 'Marathi FM', code: 'mr-IN', queries: ['Radio Mirchi Marathi', 'Mirchi Marathi', 'Radio City Marathi', 'Radio Mirchi Pune', 'Marathi'], lang: 'marathi' },
  { id: 'gu', native: 'ગુજરાતી', language: 'Gujarati', name: 'Gujarati radio', code: 'gu-IN', queries: ['Radio City Ahmedabad', 'Radio City 91.1', 'Goldy Gujarati', 'AIR Gujarati', 'My FM Ahmedabad', 'Radio Awaj', 'Radio Utsav'], lang: 'gujarati', anyCountry: true },
];

// ---------- Weather copy, in each station's language ----------
type Cat = 'clear' | 'partly' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'showers' | 'snow' | 'storm';
type Copy = { cond: Record<Cat, string>; feels: string; humidity: string; wind: string; papers: string; locate: string };
const COPY: Record<string, Copy> = {
  hi: {
    cond: { clear: 'साफ़ आसमान', partly: 'आंशिक बादल', cloudy: 'बादल छाए', fog: 'कोहरा', drizzle: 'बूंदाबांदी', rain: 'बारिश', showers: 'बौछारें', snow: 'बर्फ़बारी', storm: 'गरज के साथ बारिश' },
    feels: 'महसूस', humidity: 'नमी', wind: 'हवा', papers: 'आज के अख़बार', locate: 'लोकेशन अपडेट करें',
  },
  ta: {
    cond: { clear: 'தெளிவான வானம்', partly: 'பகுதி மேகமூட்டம்', cloudy: 'மேகமூட்டம்', fog: 'பனிமூட்டம்', drizzle: 'தூறல்', rain: 'மழை', showers: 'சாரல் மழை', snow: 'பனிப்பொழிவு', storm: 'இடியுடன் கூடிய மழை' },
    feels: 'உணரும் வெப்பம்', humidity: 'ஈரப்பதம்', wind: 'காற்று', papers: 'இன்றைய நாளிதழ்கள்', locate: 'இடத்தைப் புதுப்பிக்கவும்',
  },
  te: {
    cond: { clear: 'నిర్మలమైన ఆకాశం', partly: 'పాక్షికంగా మేఘావృతం', cloudy: 'మేఘావృతం', fog: 'పొగమంచు', drizzle: 'చినుకులు', rain: 'వర్షం', showers: 'జల్లులు', snow: 'మంచు', storm: 'ఉరుములతో వర్షం' },
    feels: 'అనుభూతి', humidity: 'తేమ', wind: 'గాలి', papers: 'నేటి వార్తాపత్రికలు', locate: 'స్థానాన్ని నవీకరించండి',
  },
  kn: {
    cond: { clear: 'ಸ್ವಚ್ಛ ಆಕಾಶ', partly: 'ಭಾಗಶಃ ಮೋಡ', cloudy: 'ಮೋಡ ಕವಿದಿದೆ', fog: 'ಮಂಜು', drizzle: 'ತುಂತುರು ಮಳೆ', rain: 'ಮಳೆ', showers: 'ಮಳೆಯ ಸಿಂಚನ', snow: 'ಹಿಮ', storm: 'ಗುಡುಗು ಸಹಿತ ಮಳೆ' },
    feels: 'ಅನುಭವ', humidity: 'ಆರ್ದ್ರತೆ', wind: 'ಗಾಳಿ', papers: 'ಇಂದಿನ ಪತ್ರಿಕೆಗಳು', locate: 'ಸ್ಥಳವನ್ನು ನವೀಕರಿಸಿ',
  },
  ml: {
    cond: { clear: 'തെളിഞ്ഞ ആകാശം', partly: 'ഭാഗികമായി മേഘാവൃതം', cloudy: 'മേഘാവൃതം', fog: 'മൂടൽമഞ്ഞ്', drizzle: 'ചാറ്റൽമഴ', rain: 'മഴ', showers: 'ഇടവിട്ട മഴ', snow: 'മഞ്ഞുവീഴ്ച', storm: 'ഇടിമിന്നലോടെ മഴ' },
    feels: 'അനുഭവപ്പെടുന്നത്', humidity: 'ഈർപ്പം', wind: 'കാറ്റ്', papers: 'ഇന്നത്തെ പത്രങ്ങൾ', locate: 'സ്ഥലം പുതുക്കുക',
  },
  bn: {
    cond: { clear: 'পরিষ্কার আকাশ', partly: 'আংশিক মেঘলা', cloudy: 'মেঘলা', fog: 'কুয়াশা', drizzle: 'গুঁড়ি গুঁড়ি বৃষ্টি', rain: 'বৃষ্টি', showers: 'বৃষ্টির ঝাপটা', snow: 'তুষারপাত', storm: 'বজ্রসহ বৃষ্টি' },
    feels: 'অনুভূত', humidity: 'আর্দ্রতা', wind: 'বাতাস', papers: 'আজকের সংবাদপত্র', locate: 'অবস্থান আপডেট করুন',
  },
  mr: {
    cond: { clear: 'निरभ्र आकाश', partly: 'अंशतः ढगाळ', cloudy: 'ढगाळ', fog: 'धुके', drizzle: 'रिमझिम', rain: 'पाऊस', showers: 'सरी', snow: 'बर्फवृष्टी', storm: 'विजांसह पाऊस' },
    feels: 'जाणवणारे', humidity: 'आर्द्रता', wind: 'वारा', papers: 'आजची वर्तमानपत्रे', locate: 'स्थान अद्यतनित करा',
  },
  gu: {
    cond: { clear: 'સ્વચ્છ આકાશ', partly: 'આંશિક વાદળછાયું', cloudy: 'વાદળછાયું', fog: 'ધુમ્મસ', drizzle: 'ઝરમર', rain: 'વરસાદ', showers: 'વરસાદી ઝાપટાં', snow: 'હિમવર્ષા', storm: 'ગાજવીજ સાથે વરસાદ' },
    feels: 'અનુભવાય', humidity: 'ભેજ', wind: 'પવન', papers: 'આજના અખબારો', locate: 'સ્થાન અપડેટ કરો',
  },
};

// ---------- Newspapers per language (links go to the publishers' own sites) ----------
type Paper = { n: string; en: string; url: string };
const PAPERS: Record<string, Paper[]> = {
  hi: [
    { n: 'दैनिक भास्कर', en: 'Dainik Bhaskar', url: 'https://www.bhaskar.com' },
    { n: 'दैनिक जागरण', en: 'Dainik Jagran', url: 'https://www.jagran.com' },
    { n: 'अमर उजाला', en: 'Amar Ujala', url: 'https://www.amarujala.com' },
    { n: 'नवभारत टाइम्स', en: 'Navbharat Times', url: 'https://navbharattimes.indiatimes.com' },
    { n: 'हिंदुस्तान', en: 'Hindustan', url: 'https://www.livehindustan.com' },
  ],
  ta: [
    { n: 'தினமலர்', en: 'Dinamalar', url: 'https://www.dinamalar.com' },
    { n: 'தினத்தந்தி', en: 'Daily Thanthi', url: 'https://www.dailythanthi.com' },
    { n: 'இந்து தமிழ் திசை', en: 'Hindu Tamil Thisai', url: 'https://www.hindutamil.in' },
    { n: 'தினமணி', en: 'Dinamani', url: 'https://www.dinamani.com' },
    { n: 'தினகரன்', en: 'Dinakaran', url: 'https://www.dinakaran.com' },
  ],
  te: [
    { n: 'ఈనాడు', en: 'Eenadu', url: 'https://www.eenadu.net' },
    { n: 'సాక్షి', en: 'Sakshi', url: 'https://www.sakshi.com' },
    { n: 'ఆంధ్రజ్యోతి', en: 'Andhra Jyothy', url: 'https://www.andhrajyothy.com' },
    { n: 'నమస్తే తెలంగాణ', en: 'Namasthe Telangana', url: 'https://www.ntnews.com' },
    { n: 'వార్త', en: 'Vaartha', url: 'https://www.vaartha.com' },
  ],
  kn: [
    { n: 'ಪ್ರಜಾವಾಣಿ', en: 'Prajavani', url: 'https://www.prajavani.net' },
    { n: 'ವಿಜಯ ಕರ್ನಾಟಕ', en: 'Vijay Karnataka', url: 'https://vijaykarnataka.com' },
    { n: 'ಕನ್ನಡ ಪ್ರಭ', en: 'Kannada Prabha', url: 'https://www.kannadaprabha.com' },
    { n: 'ವಿಜಯವಾಣಿ', en: 'Vijayavani', url: 'https://www.vijayavani.net' },
    { n: 'ಉದಯವಾಣಿ', en: 'Udayavani', url: 'https://www.udayavani.com' },
  ],
  ml: [
    { n: 'മാതൃഭൂമി', en: 'Mathrubhumi', url: 'https://www.mathrubhumi.com' },
    { n: 'മലയാള മനോരമ', en: 'Malayala Manorama', url: 'https://www.manoramaonline.com' },
    { n: 'ദേശാഭിമാനി', en: 'Deshabhimani', url: 'https://www.deshabhimani.com' },
    { n: 'മാധ്യമം', en: 'Madhyamam', url: 'https://www.madhyamam.com' },
    { n: 'കേരള കൗമുദി', en: 'Kerala Kaumudi', url: 'https://keralakaumudi.com' },
  ],
  bn: [
    { n: 'আনন্দবাজার পত্রিকা', en: 'Anandabazar Patrika', url: 'https://www.anandabazar.com' },
    { n: 'বর্তমান', en: 'Bartaman', url: 'https://bartamanpatrika.com' },
    { n: 'সংবাদ প্রতিদিন', en: 'Sangbad Pratidin', url: 'https://www.sangbadpratidin.in' },
    { n: 'এই সময়', en: 'Ei Samay', url: 'https://eisamay.com' },
  ],
  mr: [
    { n: 'लोकमत', en: 'Lokmat', url: 'https://www.lokmat.com' },
    { n: 'महाराष्ट्र टाइम्स', en: 'Maharashtra Times', url: 'https://maharashtratimes.com' },
    { n: 'सकाळ', en: 'Sakal', url: 'https://www.esakal.com' },
    { n: 'लोकसत्ता', en: 'Loksatta', url: 'https://www.loksatta.com' },
    { n: 'पुढारी', en: 'Pudhari', url: 'https://www.pudhari.news' },
  ],
  gu: [
    { n: 'ગુજરાત સમાચાર', en: 'Gujarat Samachar', url: 'https://www.gujaratsamachar.com' },
    { n: 'દિવ્ય ભાસ્કર', en: 'Divya Bhaskar', url: 'https://www.divyabhaskar.co.in' },
    { n: 'સંદેશ', en: 'Sandesh', url: 'https://sandesh.com' },
    { n: 'નવગુજરાત સમય', en: 'Navgujarat Samay', url: 'https://navgujaratsamay.com' },
  ],
};
const TILE_COLORS = ['#c2410c', '#0f766e', '#1d4ed8', '#9333ea', '#be123c'];

// ---------- Weather + sky helpers ----------
type Coords = { lat: number; lon: number };
type Weather = { temp: number; feels: number; humidity: number; wind: number; code: number; offset: number; sunrises: number[]; sunsets: number[] };

const DAY_MS = 86400000;

const weatherCat = (c: number): Cat =>
  c <= 1 ? 'clear' : c === 2 ? 'partly' : c === 3 ? 'cloudy' : c <= 48 ? 'fog' : c <= 57 ? 'drizzle' : c <= 67 ? 'rain' : c <= 77 ? 'snow' : c <= 82 ? 'showers' : c <= 86 ? 'snow' : 'storm';

// "now" is a timestamp whose UTC fields read as the place's local clock time
type Sky = { isDay: boolean; progress: number; rise?: number; set?: number };
function skyState(w: Weather | null, now: number): Sky {
  const dayStart = Math.floor(now / DAY_MS);
  const rise = w?.sunrises.find((t) => Math.floor(t / DAY_MS) === dayStart);
  const set = w?.sunsets.find((t) => Math.floor(t / DAY_MS) === dayStart);
  if (w) {
    for (let i = 0; i < Math.min(w.sunrises.length, w.sunsets.length); i++) {
      if (now >= w.sunrises[i] && now < w.sunsets[i]) {
        return { isDay: true, progress: (now - w.sunrises[i]) / (w.sunsets[i] - w.sunrises[i]), rise, set };
      }
    }
    const prevSet = w.sunsets.filter((t) => t <= now).pop();
    const nextRise = w.sunrises.find((t) => t > now);
    if (prevSet !== undefined && nextRise !== undefined) {
      return { isDay: false, progress: (now - prevSet) / (nextRise - prevSet), rise, set };
    }
  }
  // no sunrise data yet: guess from the clock (6:00 to 18:00 is day)
  const d = new Date(now);
  const h = d.getUTCHours() + d.getUTCMinutes() / 60;
  if (h >= 6 && h < 18) return { isDay: true, progress: (h - 6) / 12, rise, set };
  return { isDay: false, progress: ((h + 18) % 24) / 12, rise, set };
}

// 0 = new moon, 0.5 = full, back to 1 = new again
const moonPhase = (now: number) => {
  const P = 29.530588853;
  const days = (now - Date.UTC(2000, 0, 6, 18, 14)) / DAY_MS;
  return (((days % P) + P) % P) / P;
};

// Lit part of the moon, drawn around (0,0)
const moonPath = (r: number, p: number) => {
  const k = Math.cos(2 * Math.PI * p);
  const rx = Math.max(0.01, r * Math.abs(k));
  const sweep = k > 0 ? 0 : 1;
  return `M 0 ${-r} A ${r} ${r} 0 0 1 0 ${r} A ${rx} ${r} 0 0 ${sweep} 0 ${-r} Z`;
};

function SkyArc({ sky, phase, label }: { sky: Sky; phase: number; label: string }) {
  const cx = 100, cy = 92, R = 78;
  const p = Math.min(1, Math.max(0, sky.progress));
  const theta = Math.PI * (1 - p);
  const x = cx + R * Math.cos(theta);
  const y = cy - R * Math.sin(theta);
  const dusk = sky.isDay && (p < 0.1 || p > 0.9);
  const top = sky.isDay ? (dusk ? '#f9a86b' : '#8ecbff') : '#0e1033';
  const bottom = sky.isDay ? (dusk ? '#ffe3b8' : '#e4f3ff') : '#2e2455';
  const stars = [[26, 18], [58, 10], [88, 30], [124, 14], [152, 30], [176, 12], [44, 44], [140, 52]];
  return (
    <svg viewBox="0 0 200 110" className="w-full h-auto block" role="img" aria-label={label}>
      <defs>
        <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <radialGradient id="sunglow">
          <stop offset="0" stopColor="#fbbf24" stopOpacity=".7" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="110" fill="url(#skyg)" />
      {!sky.isDay && stars.map(([sx, sy], i) => <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 1.3 : 0.9} fill="#fff" opacity={0.85} />)}
      <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke={sky.isDay ? '#ffffff' : '#c9c4f0'} strokeWidth="1.2" strokeDasharray="2 5" strokeLinecap="round" opacity=".7" />
      <rect x="0" y={cy} width="200" height={110 - cy} fill={sky.isDay ? '#5d8a4a' : '#12141f'} opacity={sky.isDay ? 0.85 : 0.95} />
      <line x1="0" y1={cy} x2="200" y2={cy} stroke={sky.isDay ? '#ffffff' : '#6a64a8'} strokeWidth="1" opacity=".6" />
      {sky.isDay ? (
        <g transform={`translate(${x} ${y})`}>
          <circle r="22" fill="url(#sunglow)" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="0" y1="-12.5" x2="0" y2="-16.5" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="9" fill="#fbbf24" />
          <circle r="9" fill="none" stroke="#f59e0b" strokeWidth="1" />
        </g>
      ) : (
        <g transform={`translate(${x} ${y})`}>
          <circle r="16" fill="#e9e4ff" opacity=".12" />
          <circle r="9" fill="#3b3f6e" />
          <g transform={phase > 0.5 ? 'scale(-1 1)' : undefined}>
            <path d={moonPath(9, phase)} fill="#f6f1d6" />
          </g>
        </g>
      )}
    </svg>
  );
}

function NewsStack({ dark }: { dark: boolean }) {
  const paper = dark ? '#f3e7d3' : '#fffdf8';
  const ink = dark ? '#3a2c20' : '#44302a';
  return (
    <svg viewBox="0 0 160 96" className="w-full h-auto block" role="img" aria-label="A stack of newspapers">
      <g transform="rotate(-7 80 56)">
        <rect x="26" y="14" width="100" height="70" rx="3" fill={paper} stroke={ink} strokeWidth="1.2" opacity=".8" />
        <rect x="34" y="22" width="40" height="5" fill={ink} opacity=".35" />
      </g>
      <g transform="rotate(5 80 56)">
        <rect x="32" y="12" width="100" height="72" rx="3" fill={paper} stroke={ink} strokeWidth="1.2" opacity=".92" />
        <rect x="40" y="20" width="44" height="5" fill={ink} opacity=".4" />
      </g>
      <rect x="28" y="10" width="104" height="76" rx="3" fill={paper} stroke={ink} strokeWidth="1.5" />
      <rect x="36" y="17" width="88" height="11" rx="1.5" fill="#c2410c" />
      <rect x="42" y="21" width="44" height="3" rx="1.5" fill="#fff" opacity=".9" />
      <line x1="36" y1="33" x2="124" y2="33" stroke={ink} strokeWidth="1" opacity=".5" />
      <rect x="36" y="38" width="38" height="28" rx="2" fill="#f4b57a" />
      <path d="M36 66 L50 52 L60 60 L68 50 L74 58 L74 66 Z" fill="#a0612f" opacity=".75" />
      <circle cx="64" cy="46" r="4" fill="#fff4d6" />
      {[38, 44, 50, 56, 62].map((yy, i) => <rect key={yy} x="80" y={yy} width={i === 0 ? 40 : 44} height="3" rx="1.5" fill={ink} opacity={i === 0 ? 0.75 : 0.35} />)}
      {[72, 77, 82].map((yy) => <rect key={yy} x="36" y={yy} width="88" height="2.5" rx="1.2" fill={ink} opacity=".28" />)}
    </svg>
  );
}

export default function GauraiyyaRadio() {
  const { darkMode } = useDarkMode();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [liveName, setLiveName] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<any>(null);
  const good = useRef<Record<string, { url: string; name: string }>>({}); // last working stream per station
  const token = useRef(0);
  const trying = useRef(false);

  // guest limit / login gate
  const [authed, setAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [used, setUsed] = useState(0);
  const usedRef = useRef(0);
  const [showGate, setShowGate] = useState(false);

  // weather panel
  const [coords, setCoords] = useState<Coords | null>(null);
  const [locating, setLocating] = useState(true);
  const [place, setPlace] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [now, setNow] = useState<number | null>(null);

  const st = stations[active];
  const copy = COPY[st.id];
  const papers = PAPERS[st.id] ?? [];

  const stopHls = () => { hlsRef.current?.destroy(); hlsRef.current = null; };

  const stopAll = () => {
    token.current++;
    trying.current = false;
    stopHls();
    audioRef.current?.pause();
    setPlaying(false);
    setLoading(false);
  };

  // true (and opens the modal) if this guest has used up the free minutes
  const blocked = () => {
    if (authChecked && !authed && usedRef.current >= FREE_SECONDS) {
      setShowGate(true);
      return true;
    }
    return false;
  };

  // Try one URL: resolves true once audio is actually playing, false on error / 7s timeout
  const attempt = (url: string) =>
    new Promise<boolean>((resolve) => {
      const a = audioRef.current;
      if (!a) return resolve(false);
      stopHls();
      let finished = false;
      const done = (ok: boolean) => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        a.removeEventListener('playing', onOk);
        a.removeEventListener('error', onErr);
        if (!ok) { stopHls(); a.removeAttribute('src'); a.load(); }
        resolve(ok);
      };
      // A real live stream has no fixed length. A finite duration means it's a short clip/jingle, so skip it.
      const onOk = () => {
        const isClip = !/\.m3u8(\?|$)/i.test(url) && Number.isFinite(a.duration) && a.duration > 0;
        done(!isClip);
      };
      const onErr = () => done(false);
      const timer = setTimeout(() => done(false), 7000);
      a.addEventListener('playing', onOk);
      a.addEventListener('error', onErr);

      const isHls = /\.m3u8(\?|$)/i.test(url);
      if (isHls && !a.canPlayType('application/vnd.apple.mpegurl')) {
        import('hls.js').then(({ default: Hls }) => {
          if (!Hls.isSupported()) return done(false);
          const hls = new Hls();
          hlsRef.current = hls;
          hls.on(Hls.Events.ERROR, (_e: unknown, d: { fatal?: boolean }) => { if (d.fatal) done(false); });
          hls.loadSource(url);
          hls.attachMedia(a);
          a.play().catch(() => {});
        }).catch(() => done(false));
      } else {
        a.src = url;
        a.play().catch(() => {});
      }
    });

  // Collect candidate streams (https only on an https page)
  const candidates = async (s: Station) => {
    const out: { url: string; name: string }[] = [];
    const seen = new Set<string>();
    // Skip stations explicitly tagged only with some other Indian language
    const others = ['hindi', 'bengali', 'bangla', 'tamil', 'telugu', 'kannada', 'malayalam', 'marathi', 'gujarati', 'punjabi'];
    const keys = s.lang === 'bengali' ? ['bengali', 'bangla'] : [s.lang];
    const langOk = (x: any) => {
      const l = String(x.language || '').toLowerCase();
      if (!l || keys.some((k) => l.includes(k))) return true;
      return !others.some((o) => l.includes(o));
    };
    const add = (list: any[]) => {
      for (const x of list) {
        if (!langOk(x)) continue;
        for (const url of [x.url_resolved, x.url] as string[]) {
          if (!url || seen.has(url)) continue;
          if (window.location.protocol === 'https:' && !url.startsWith('https:')) continue;
          seen.add(url);
          out.push({ url, name: x.name });
        }
      }
    };
    const search = async (p: Record<string, string>) => {
      const params = new URLSearchParams({ hidebroken: 'true', order: 'clickcount', reverse: 'true', limit: '25', ...p });
      try {
        const r = await fetch(`${RB_API}/stations/search?${params}`);
        add(await r.json());
      } catch { /* try next */ }
    };
    for (const q of s.queries) await search({ name: q, countrycode: 'IN' });
    await search({ language: s.lang, countrycode: 'IN' });
    await search({ tag: s.lang, countrycode: 'IN' });
    if (s.anyCountry) for (const q of s.queries) await search({ name: q }); // diaspora / non-IN listings
    await search({ language: s.lang }); // any country, last resort
    return out;
  };

  const tune = async (index: number) => {
    if (blocked()) return;
    const my = ++token.current;
    const s = stations[index];
    trying.current = true;
    setError('');
    setLoading(true);
    setLiveName('');
    try {
      const queue: { url: string; name: string }[] = [];
      if (good.current[s.id]) queue.push(good.current[s.id]);
      (s.urls ?? []).forEach((u) => queue.push({ url: u, name: s.name }));
      let fetched = false;
      let tried = 0;
      while (tried < 18) {
        if (!queue.length && !fetched) {
          fetched = true;
          queue.push(...(await candidates(s)));
          if (my !== token.current) return;
        }
        const next = queue.shift();
        if (!next) break;
        tried++;
        const ok = await attempt(next.url);
        if (my !== token.current) { stopHls(); audioRef.current?.pause(); return; }
        if (ok) {
          good.current[s.id] = next;
          setLiveName(next.name);
          setPlaying(true);
          return;
        }
      }
      setPlaying(false);
      setError(`Couldn't find a working ${s.language} stream right now. Try another station.`);
    } finally {
      if (my === token.current) { setLoading(false); trying.current = false; }
    }
  };

  const togglePlay = () => {
    if (playing || loading) stopAll();
    else tune(active);
  };

  const pick = (i: number) => {
    setActive(i);
    if (playing || loading) tune(i);
  };

  useEffect(() => () => { stopHls(); audioRef.current?.pause(); }, []);

  // ---------- Auth + free-listening limit ----------

  const checkAuth = async () => {
    const t = getToken();
    if (!t) { setAuthed(false); setAuthChecked(true); return; }
    try {
      const r = await fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${t}` } });
      if (r.ok) {
        setAuthed(true);
        setShowGate(false);
      } else {
        try { localStorage.removeItem('token'); } catch { /* ignore */ }
        setAuthed(false);
      }
    } catch {
      setAuthed(false);
    }
    setAuthChecked(true);
  };

  useEffect(() => {
    try { usedRef.current = Number(localStorage.getItem(FREE_KEY)) || 0; } catch { /* ignore */ }
    setUsed(usedRef.current);
    checkAuth();
    // logged in from another tab? re-check when the user comes back
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  // A guest's free time only runs while audio is actually playing
  useEffect(() => {
    if (!playing || authed) return;
    const t = setInterval(() => {
      usedRef.current += 1;
      setUsed(usedRef.current);
      try { localStorage.setItem(FREE_KEY, String(usedRef.current)); } catch { /* ignore */ }
      if (usedRef.current >= FREE_SECONDS) {
        stopAll();
        setShowGate(true);
      }
    }, 1000);
    return () => clearInterval(t);
  }, [playing, authed]);

  // lock page scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = showGate ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showGate]);

  // ---------- Location, weather, clock ----------

  // Ask the browser first; if that is denied or unavailable, fall back to an IP-based guess, then to Delhi
  const locate = () => {
    setLocating(true);
    const fallback = async () => {
      try {
        const r = await fetch('https://ipwho.is/');
        const j = await r.json();
        if (j && j.success !== false && typeof j.latitude === 'number' && typeof j.longitude === 'number') {
          setCoords({ lat: j.latitude, lon: j.longitude });
          return;
        }
      } catch { /* use default */ }
      setCoords(DEFAULT_COORDS);
    };
    if (typeof navigator === 'undefined' || !navigator.geolocation) { void fallback(); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => setCoords({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => { void fallback(); },
      { timeout: 8000, maximumAge: 10 * 60 * 1000 },
    );
  };

  useEffect(() => { locate(); }, []);

  // Clock, ticks every 30 s
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  // Weather from Open-Meteo (free, no key), refreshed every 15 minutes
  useEffect(() => {
    if (!coords) return;
    let dead = false;
    const ac = new AbortController();
    const load = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}` +
          `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m` +
          `&daily=sunrise,sunset&timezone=auto&past_days=1&forecast_days=2`;
        const r = await fetch(url, { signal: ac.signal });
        const j = await r.json();
        if (dead || !j?.current) return;
        const toMs = (s: string) => Date.parse(`${s}Z`); // "2026-10-20T06:12" read as the place's clock
        setWeather({
          temp: j.current.temperature_2m,
          feels: j.current.apparent_temperature,
          humidity: j.current.relative_humidity_2m,
          wind: j.current.wind_speed_10m,
          code: j.current.weather_code,
          offset: j.utc_offset_seconds ?? 0,
          sunrises: (j.daily?.sunrise ?? []).map(toMs),
          sunsets: (j.daily?.sunset ?? []).map(toMs),
        });
      } catch { /* keep the last reading */ }
      finally { if (!dead) setLocating(false); }
    };
    load();
    const t = setInterval(load, 15 * 60 * 1000);
    return () => { dead = true; ac.abort(); clearInterval(t); };
  }, [coords]);

  // Place name, in the selected language
  useEffect(() => {
    if (!coords) return;
    const ac = new AbortController();
    const lc = st.code.split('-')[0];
    // "Noida, Uttar Pradesh": split on commas so a repeated state never shows twice
    const clean = (parts: (string | undefined)[]) => {
      const out: string[] = [];
      for (const p of parts) {
        for (const piece of String(p ?? '').split(',')) {
          const t = piece.trim();
          if (t && !out.includes(t)) out.push(t);
        }
      }
      return out.join(', ');
    };
    (async () => {
      // OpenStreetMap first: it names the actual city or town (Noida, Greater Noida...)
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=12&addressdetails=1&accept-language=${lc}&lat=${coords.lat}&lon=${coords.lon}`, { signal: ac.signal });
        const j = await r.json();
        const a = j?.address ?? {};
        const name = clean([a.city || a.town || a.village || a.suburb || a.county, a.state]);
        if (name) { setPlace(name); return; }
      } catch { /* try the backup */ }
      if (ac.signal.aborted) return;
      // Backup: BigDataCloud
      try {
        const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.lat}&longitude=${coords.lon}&localityLanguage=${lc}`, { signal: ac.signal });
        const j = await r.json();
        const name = clean([j.city || j.locality, j.principalSubdivision]);
        if (name) setPlace(name);
      } catch { /* keep the previous name */ }
    })();
    return () => ac.abort();
  }, [coords, st.code]);

  // "Local" time as a UTC-fielded timestamp: the place's clock if we know it, else this device's clock
  const localNow = now === null ? null : weather ? now + weather.offset * 1000 : now - new Date().getTimezoneOffset() * 60000;
  const sky = localNow === null ? null : skyState(weather, localNow);
  const phase = localNow === null ? 0 : moonPhase(localNow);

  const fmtDate = localNow === null ? '' : new Intl.DateTimeFormat(st.code, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(localNow));
  const fmtTime = (ms: number) => new Intl.DateTimeFormat(st.code, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(new Date(ms));
  const nf = new Intl.NumberFormat(st.code, { maximumFractionDigits: 0 });

  const ink = darkMode ? 'text-orange-50' : 'text-stone-900';
  const soft = darkMode ? 'text-orange-200/75' : 'text-stone-600';
  const accent = darkMode ? 'text-orange-400' : 'text-orange-700';
  const rule = darkMode ? 'border-orange-900/40' : 'border-orange-200';
  const wire = darkMode ? '#e7c9a5' : '#44302a';
  const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500';
  const card = `rounded-2xl border backdrop-blur-sm overflow-hidden ${darkMode ? 'bg-white/5 border-orange-900/40' : 'bg-white/65 border-orange-200'}`;

  const heroSky = darkMode
    ? 'linear-gradient(180deg,#14122e 0%,#3b2340 38%,#6b3a2c 62%,#1a1410 100%)'
    : 'linear-gradient(180deg,#fbd9b5 0%,#ffe6cc 40%,#fff1e2 70%,#FFF9F5 100%)';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => {
          if (!trying.current && playing) {
            setPlaying(false);
            setError('This stream ended. Press play to try again.');
          }
        }}
        onError={() => {
          if (!trying.current && playing) {
            setPlaying(false);
            setError('The stream dropped. Press play to reconnect.');
          }
        }}
      />

      {/* LOGIN GATE: shown after the free minutes, can't be dismissed */}
      {showGate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
        >
          <div className={`w-full max-w-md rounded-3xl border p-8 text-center shadow-2xl ${darkMode ? 'bg-[#1f1612] border-orange-900/50' : 'bg-[#FFF9F5] border-orange-200'}`}>
            <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center bg-linear-to-br from-orange-500 to-red-600 text-white">
              <Lock className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 id="gate-title" className={`${display.className} text-2xl sm:text-3xl font-semibold ${ink}`}>
              Liked the music?
            </h2>
            <p className={`mt-3 text-sm sm:text-base ${soft}`}>
              Log in to VartaLang to keep listening. Radio stays free, you just need an account.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <a
                href="/auth/login?redirect=/radio"
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all ${focus}`}
              >
                <LogIn className="w-4 h-4" aria-hidden="true" /> Log in to continue
              </a>
              <a
                href="/auth/signup?redirect=/radio"
                className={`px-8 py-3.5 rounded-full font-semibold border transition-all ${focus} ${
                  darkMode ? 'border-orange-700 text-orange-200 hover:bg-orange-900/20' : 'border-orange-300 text-stone-700 hover:bg-orange-50'
                }`}
              >
                New here? Create an account
              </a>
            </div>
          </div>
        </div>
      )}

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href={MAIN_SITE} className={`text-lg ${ink} ${focus} rounded`}>
            <span className="font-black">Varta</span><span className="font-medium">Lang</span>
          </a>
          <div className="flex items-center gap-2">
            {authChecked && !authed && (
              <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full ${
                darkMode ? 'bg-orange-900/30 text-orange-200' : 'bg-white/70 text-stone-700'
              }`}>
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {fmtLeft(Math.max(0, FREE_SECONDS - used))} left, then log in
              </span>
            )}
            <span className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full ${
              playing
                ? darkMode ? 'bg-red-500/20 text-red-200' : 'bg-red-100 text-red-700'
                : darkMode ? 'bg-orange-900/30 text-orange-200' : 'bg-white/70 text-stone-700'
            }`}>
              <span className="relative flex h-2 w-2">
                {playing && <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${playing ? 'bg-red-500' : 'bg-stone-400'}`} />
              </span>
              {playing ? 'On air' : 'Off air'}
            </span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-14 px-4" style={{ background: heroSky }}>
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-9rem] w-[34rem] h-[34rem] rounded-full blur-2xl"
          style={{ background: darkMode
            ? 'radial-gradient(circle,#f97316 0%,rgba(249,115,22,.35) 40%,transparent 70%)'
            : 'radial-gradient(circle,#fb923c 0%,rgba(251,146,60,.35) 40%,transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[17rem_minmax(0,1fr)_17rem] gap-8 items-start">

          {/* LEFT: weather, date, sun / moon */}
          <aside className="order-2 lg:order-1 w-full max-w-md mx-auto lg:max-w-none lg:mt-10">
            <div className={card}>
              {sky && <SkyArc sky={sky} phase={phase} label={sky.isDay ? 'Sun' : 'Moon'} />}
              {sky && (sky.rise !== undefined || sky.set !== undefined) && (
                <div className={`flex items-center justify-between px-4 pt-2 text-xs font-semibold ${soft}`}>
                  <span className="inline-flex items-center gap-1"><Sun className="w-3 h-3" aria-hidden="true" />{sky.rise !== undefined ? fmtTime(sky.rise) : ''}</span>
                  <span className="inline-flex items-center gap-1"><Moon className="w-3 h-3" aria-hidden="true" />{sky.set !== undefined ? fmtTime(sky.set) : ''}</span>
                </div>
              )}
              <div className="p-4 text-left">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold flex items-center gap-1.5 min-w-0 ${ink}`}>
                    <MapPin className={`w-4 h-4 shrink-0 ${accent}`} aria-hidden="true" />
                    <span className="truncate">{place || '…'}</span>
                  </p>
                  <button
                    onClick={locate}
                    aria-label={copy.locate}
                    title={copy.locate}
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${focus} ${darkMode ? 'hover:bg-orange-900/40' : 'hover:bg-orange-100'}`}
                  >
                    {locating ? <Loader2 className={`w-3.5 h-3.5 animate-spin ${accent}`} /> : <MapPin className={`w-3.5 h-3.5 ${accent}`} />}
                  </button>
                </div>

                {localNow !== null && (
                  <>
                    <p className={`${display.className} text-4xl font-semibold mt-2 ${ink}`}>{fmtTime(localNow)}</p>
                    <p className={`text-sm mt-0.5 ${soft}`}>{fmtDate}</p>
                  </>
                )}

                {weather ? (
                  <div className={`mt-4 pt-4 border-t ${rule}`}>
                    <div className="flex items-baseline gap-3">
                      <span className={`${display.className} text-4xl font-semibold ${ink}`}>{nf.format(weather.temp)}°C</span>
                      <span className={`text-sm font-semibold ${accent}`}>{copy.cond[weatherCat(weather.code)]}</span>
                    </div>
                    <dl className={`mt-3 grid grid-cols-3 gap-2 text-xs ${soft}`}>
                      <div>
                        <dt className="flex items-center gap-1"><Thermometer className="w-3 h-3" aria-hidden="true" />{copy.feels}</dt>
                        <dd className={`mt-0.5 text-sm font-semibold ${ink}`}>{nf.format(weather.feels)}°</dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1"><Droplets className="w-3 h-3" aria-hidden="true" />{copy.humidity}</dt>
                        <dd className={`mt-0.5 text-sm font-semibold ${ink}`}>{nf.format(weather.humidity)}%</dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1"><Wind className="w-3 h-3" aria-hidden="true" />{copy.wind}</dt>
                        <dd className={`mt-0.5 text-sm font-semibold ${ink}`}>{nf.format(weather.wind)} km/h</dd>
                      </div>
                    </dl>
                  </div>
                ) : (
                  <div className={`mt-4 pt-4 border-t ${rule} flex items-center gap-2 ${soft}`}>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* CENTER: the radio */}
          <div className="order-1 lg:order-2 text-center min-w-0">
            <h1 className={`${deva.className} text-7xl sm:text-8xl leading-none ${ink}`}>गौरैया</h1>
            <div className={`${display.className} italic text-3xl sm:text-4xl mt-1 ${accent}`}>Gauraiyya</div>
            <p className={`mt-5 text-lg sm:text-xl max-w-xl mx-auto ${darkMode ? 'text-orange-100/90' : 'text-stone-800'}`}>
              Live multilingual radio, by <span className="font-black">Varta</span>Lang.
            </p>
            <p className={`mt-2 text-sm max-w-md mx-auto ${soft}`}>
              Real radio stations from across India. Pick a language and the sparrow tunes in.
            </p>

            {/* TUNING WIRE */}
            <div className="mt-16 sm:mt-20 px-2 sm:px-8">
              <div className="relative">
                <div
                  className="absolute bottom-full w-32 sm:w-44 transition-[left] duration-700 ease-in-out"
                  style={{ left: `${((active + 0.5) / stations.length) * 100}%`, transform: 'translate(-48%, 5%)' }}
                >
                  <div key={active} className="hop">
                    <Sparrow singing={playing} />
                  </div>
                </div>

                <div className="h-0.5 rounded-full" style={{ background: wire }} />

                <div role="tablist" aria-label="Choose a station" className="grid" style={{ gridTemplateColumns: `repeat(${stations.length}, minmax(0, 1fr))` }}>
                  {stations.map((s, i) => (
                    <button
                      key={s.id}
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`${s.name}, ${s.language}`}
                      onClick={() => pick(i)}
                      className={`flex flex-col items-center pb-2 rounded-b-lg ${focus} group`}
                    >
                      <span className={`block w-px transition-all ${i === active ? 'h-5 bg-orange-500' : 'h-3 group-hover:h-4'}`}
                        style={i === active ? undefined : { background: wire, opacity: 0.6 }} />
                      <span className={`mt-1.5 text-sm sm:text-base font-semibold transition-colors ${
                        i === active ? (darkMode ? 'text-orange-300' : 'text-orange-700') : soft
                      }`}>{s.native}</span>
                      <span className={`hidden xl:block text-[11px] leading-tight text-center px-0.5 ${soft}`}>{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PLAYER */}
            <div className="mt-8 flex flex-col items-center">
              <button
                onClick={togglePlay}
                aria-label={playing ? `Pause ${st.name}` : `Play ${st.name}`}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl bg-linear-to-br from-orange-500 to-red-600 hover:scale-105 active:scale-95 transition-transform ${focus}`}
              >
                {playing && <span className="absolute inset-0 rounded-full bg-orange-500/40 animate-ping" />}
                {loading
                  ? <Loader2 className="relative w-8 h-8 animate-spin" />
                  : playing
                    ? <Pause className="relative w-8 h-8" fill="currentColor" />
                    : <Play className="relative w-8 h-8 ml-1" fill="currentColor" />}
              </button>
              <p className={`mt-3 text-base font-semibold ${ink}`}>{playing && liveName ? liveName : st.name}</p>
              <p className={`text-sm ${soft}`}>
                {loading ? 'Finding a working stream…' : playing ? `Live in ${st.language}` : `${st.language}, tap to listen`}
              </p>
              <p role="status" className={`mt-1 text-xs min-h-4 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
            </div>

            <div className="mt-3 flex items-end justify-center gap-1 h-10" aria-hidden="true">
              {Array.from({ length: 32 }).map((_, i) => (
                <span
                  key={i}
                  className={`eq-bar w-1 rounded-full ${playing ? 'eq-on' : ''} ${darkMode ? 'bg-orange-400' : 'bg-orange-500'}`}
                  style={{ animationDelay: `${((i * 37) % 11) * 0.09}s`, animationDuration: `${0.7 + ((i * 13) % 7) * 0.12}s` }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: newspapers in the selected language */}
          <aside className="order-3 w-full max-w-md mx-auto lg:max-w-none lg:mt-10">
            <div className={card}>
              <div className={`px-4 pt-4 ${darkMode ? 'bg-orange-900/20' : 'bg-orange-100/60'}`}>
                <div className="max-w-[10rem] mx-auto">
                  <NewsStack dark={darkMode} />
                </div>
              </div>
              <div className="p-4 text-left">
                <h2 className={`flex items-center gap-2 text-sm font-semibold ${ink}`}>
                  <Newspaper className={`w-4 h-4 ${accent}`} aria-hidden="true" />
                  {copy.papers}
                </h2>
                <ul className="mt-3 space-y-1.5">
                  {papers.map((p, i) => (
                    <li key={p.url}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors ${focus} ${darkMode ? 'hover:bg-orange-900/30' : 'hover:bg-orange-100/70'}`}
                      >
                        <span
                          className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-white text-base font-bold"
                          style={{ background: TILE_COLORS[i % TILE_COLORS.length] }}
                          aria-hidden="true"
                        >
                          {Array.from(p.n)[0]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block text-sm font-semibold truncate ${ink}`}>{p.n}</span>
                          <span className={`block text-[11px] truncate ${soft}`}>{p.en}</span>
                        </span>
                        <ExternalLink className={`w-3.5 h-3.5 shrink-0 opacity-50 group-hover:opacity-100 ${soft}`} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            { icon: Radio, title: 'Real stations, live', text: 'Indian radio stations, streamed as they broadcast right now.' },
            { icon: Languages, title: 'One dial, every language', text: 'Choose a language and the sparrow hops to a station that speaks it. The weather, date and newspapers follow along.' },
            { icon: GraduationCap, title: 'Learn as you listen', text: 'Heard a phrase you liked? Practise it with AI and language partners on VartaLang.' },
          ].map((f) => (
            <div key={f.title}>
              <f.icon className={`w-6 h-6 mb-3 ${accent}`} aria-hidden="true" />
              <h2 className={`${display.className} text-xl font-semibold mb-1.5 ${ink}`}>{f.title}</h2>
              <p className={`text-sm leading-relaxed ${soft}`}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-[#1f1612]' : 'bg-orange-50/40'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`${display.className} text-3xl sm:text-4xl font-semibold mb-3 ${ink}`}>
            Heard a word you liked? Learn to say it.
          </h2>
          <p className={`mb-8 ${soft}`}>
            Practise with AI, chat with language partners and find jobs that value your languages, all on VartaLang.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={`${MAIN_SITE}/auth/signup`} className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all ${focus}`}>
              Join VartaLang free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href={MAIN_SITE} className={`px-8 py-3.5 rounded-full font-semibold text-base border transition-all hover:scale-105 ${focus} ${
              darkMode ? 'border-orange-700 text-orange-200 hover:bg-orange-900/20' : 'border-orange-300 text-stone-700 hover:bg-orange-50'
            }`}>
              Visit vartalang.in
            </a>
          </div>
        </div>
      </section>

      <footer className={`py-8 px-4 text-center text-xs border-t ${rule} ${soft}`}>
        Gauraiyya by <span className="font-bold">Varta</span>Lang &middot; Station streams and newspapers belong to their broadcasters and publishers &middot; Weather by <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="underline">Open-Meteo</a>
      </footer>

      <style jsx>{`
        .hop { animation: hop 0.7s ease-in-out; }
        @keyframes hop {
          0% { transform: translateY(0); }
          40% { transform: translateY(-40px); }
          100% { transform: translateY(0); }
        }
        .head-bob { animation: bob 1.1s ease-in-out infinite; }
        @keyframes bob {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(4deg); }
        }
        .beak-talk { animation: talk 0.42s steps(2, end) infinite alternate; }
        @keyframes talk {
          from { transform: rotate(0deg); }
          to { transform: rotate(16deg); }
        }
        .tail-flick { animation: flick 1.6s ease-in-out infinite; }
        @keyframes flick {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-7deg); }
        }
        .arc { opacity: 0; animation: arc 1.4s ease-out infinite; }
        .a2 { animation-delay: 0.2s; }
        .a3 { animation-delay: 0.4s; }
        @keyframes arc {
          0% { opacity: 0; transform: translateX(-6px); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateX(6px); }
        }
        .eq-bar { height: 6px; opacity: 0.45; transform-origin: bottom; }
        .eq-on { opacity: 1; animation-name: eq; animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
        @keyframes eq {
          0%, 100% { height: 6px; }
          50% { height: 38px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hop, .head-bob, .beak-talk, .tail-flick, .arc, .eq-on { animation: none; }
          .arc { opacity: 1; }
          .eq-on { height: 20px; }
        }
      `}</style>
    </div>
  );
}

function Sparrow({ singing }: { singing: boolean }) {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-auto overflow-visible" role="img" aria-label="A house sparrow perched on a wire">
      <g className={singing ? 'tail-flick' : ''} style={{ transformOrigin: '56px 98px' }}>
        <path d="M54 90 L4 116 L13 126 L60 107 Z" fill="#6b3f22" />
        <path d="M54 94 L10 122" stroke="#d2a56b" strokeWidth="1.5" opacity=".6" />
      </g>
      <ellipse cx="94" cy="98" rx="44" ry="30" fill="#a0612f" />
      <ellipse cx="104" cy="110" rx="36" ry="21" fill="#dccdb5" />
      <path d="M58 90 Q90 68 126 92 Q106 122 64 114 Z" fill="#6b3f22" />
      <path d="M70 94 L102 100 M66 102 L98 108 M80 88 L110 94" stroke="#d2a56b" strokeWidth="2" strokeLinecap="round" opacity=".75" />
      <path d="M88 126 L88 142 M86 142 L80 143 M88 142 L94 143" stroke="#c58b5a" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M106 126 L106 142 M104 142 L98 143 M106 142 L112 143" stroke="#c58b5a" strokeWidth="3" strokeLinecap="round" fill="none" />

      <g className={singing ? 'head-bob' : ''} style={{ transformOrigin: '122px 88px' }}>
        <circle cx="132" cy="68" r="22" fill="#9a9a95" />
        <path d="M110 62 Q122 50 140 58 Q130 70 112 74 Z" fill="#8a3f1c" />
        <ellipse cx="139" cy="77" rx="11" ry="8" fill="#efe6d6" />
        <path d="M133 82 Q147 80 151 97 Q140 106 131 94 Z" fill="#1c1511" />
        <circle cx="141" cy="66" r="2.8" fill="#111" />
        <circle cx="142" cy="65" r=".9" fill="#fff" />
        <path d="M152 68 L172 72 L152 74 Z" fill="#3a2c20" />
        <g className={singing ? 'beak-talk' : ''} style={{ transformOrigin: '152px 75px' }}>
          <path d="M152 75 L167 78 L152 80 Z" fill="#4a382a" />
        </g>
      </g>

      {singing && (
        <g fill="none" stroke="#f97316" strokeLinecap="round" strokeWidth="3">
          <path className="arc a1" d="M180 62 Q186 72 180 82" />
          <path className="arc a2" d="M188 56 Q198 72 188 88" />
          <path className="arc a3" d="M196 50 Q210 72 196 94" />
        </g>
      )}
    </svg>
  );
}