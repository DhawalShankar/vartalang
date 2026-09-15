"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mic, Square, RotateCcw, Upload, CheckCircle, ArrowRight, ArrowLeft,
  Languages, FileText, ShieldCheck, AlertCircle, Loader2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/* How long a single take runs, in seconds. Recording stops on its own at 0. */
const RECORD_SECONDS = 60;

interface ChallengeUser {
  _id: string;
  name: string;
  email: string;
}

interface ScriptVariant {
  id: string;
  text: string;
}

/*
 * One script per language for now. Add more entries to any array to get
 * randomised variants — the page already picks one at random per attempt.
 * Languages without their own script fall back to the English master script.
 */
const SCRIPTS: Record<string, ScriptVariant[]> = {
  English: [
    {
      id: 'en-v1',
      text: `The morning market was full of colour — vendors calling out prices, the smell of fresh spices in the air, and children running between the stalls.

Please note today's date is the fifteenth of September, two thousand twenty-six. Our contact number is nine, eight, seven, six, five, four, three, two, one, zero.

Good morning! Thank you for calling — how may I help you today? I'd be happy to check that for you right away.

I can't believe we won the match — this is the best day ever! On a calmer note, please take a seat, and I'll be with you shortly.

Sixty slippery seashells stood silently on the sandy shore.`,
    },
  ],
  Hindi: [
    {
      id: 'hi-v1',
      text: `सुबह का बाज़ार रंगों से भरा हुआ था — दुकानदार दाम पुकार रहे थे, हवा में ताज़े मसालों की खुशबू थी, और बच्चे दुकानों के बीच दौड़ रहे थे।

कृपया ध्यान दें, आज की तारीख़ है पंद्रह सितंबर, दो हज़ार छब्बीस। हमारा संपर्क नंबर है नौ, आठ, सात, छह, पाँच, चार, तीन, दो, एक, शून्य।

नमस्ते! फ़ोन करने के लिए धन्यवाद — मैं आपकी किस तरह मदद कर सकता हूँ? मैं अभी आपके लिए यह देख लेता हूँ।

यक़ीन नहीं हो रहा कि हम मैच जीत गए — आज का दिन सबसे शानदार है! अब शांति से, आप बैठिए, मैं थोड़ी देर में आपके पास आता हूँ।

कच्चा पापड़, पक्का पापड़ — साठ सीपियाँ समंदर के किनारे शांत खड़ी थीं।`,
    },
  ],
};

const LANGUAGES = [
  'Hindi', 'English', 'Assamese', 'Bengali', 'Bodo', 'Dogri', 'Gujarati',
  'Kannada', 'Kashmiri', 'Konkani', 'Maithili', 'Malayalam', 'Manipuri (Meitei)',
  'Marathi', 'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Santali', 'Sindhi',
  'Tamil', 'Telugu', 'Urdu',
];

const CONSENT_TEXT =
  "I confirm I am 18 or older and that this recording is my own voice. I understand VartaLang will evaluate this recording for quality and language proficiency, and may allow verified companies to listen to it once, without revealing my name or contact details, so they can evaluate it for hiring purposes. If a company is interested after listening, VartaLang will contact me and I can choose whether or not to connect with them. This does not guarantee I will be hired. Recordings are processed using third-party AI transcription tools for quality scoring.";

type Step = 'language' | 'script' | 'review';

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function ChallengeStartPage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<ChallengeUser | null>(null);

  const [step, setStep] = useState<Step>('language');
  const [language, setLanguage] = useState('');
  const [script, setScript] = useState<ScriptVariant | null>(null);
  const [consented, setConsented] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RECORD_SECONDS);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---------------- Auth guard ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login?redirect=/challenge/start");
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Session expired");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setCheckingAuth(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.replace("/auth/login?redirect=/challenge/start");
      });
  }, [router]);

  /* ---------------- Cleanup ---------------- */
  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  /* ---------------- Flow ---------------- */
  const pickScript = (lang: string) => {
    const pool = SCRIPTS[lang] || SCRIPTS.English;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const handleLanguageContinue = () => {
    if (!language) return;
    setScript(pickScript(language));
    setStep('script');
  };

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  const startRecording = async () => {
    setError(null);

    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setError("This browser can't record audio. Try the latest Chrome or Safari.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;

      const preferred = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
      const mimeType = preferred.find((t) => MediaRecorder.isTypeSupported(t)) || '';

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stopStream();
        setStep('review');
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setSecondsLeft(RECORD_SECONDS);

      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError("Microphone access was blocked. Allow it in your browser settings and try again.");
      stopStream();
    }
  };

  const resetRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setSecondsLeft(RECORD_SECONDS);
    setError(null);
    setStep('script');
  };

  const handleSubmit = async () => {
    if (!audioBlob || !user || !script) return;

    setUploading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const ext = audioBlob.type.includes('mp4') ? 'm4a' : 'webm';
    const filename = `${language.replace(/[^a-zA-Z]/g, '')}_${user._id}_${Date.now()}.${ext}`;

    const formData = new FormData();
    formData.append('audio', audioBlob, filename);
    formData.append('language', language);
    formData.append('scriptId', script.id);
    formData.append('durationSec', String(RECORD_SECONDS - secondsLeft));
    formData.append('consent', 'true');
    formData.append('consentText', CONSENT_TEXT);

    try {
      const res = await fetch(`/api/challenge/submit`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      setSubmitted(true);
    } catch {
      setError("Upload didn't go through. Check your connection and submit again — your recording is still here.");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- Shared styles ---------------- */
  const pageBg = darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]';
  const cardCls = darkMode
    ? 'bg-orange-900/10 border border-orange-800/30'
    : 'bg-white border border-orange-200 shadow-sm';
  const headingCls = darkMode ? 'text-orange-50' : 'text-gray-900';
  const bodyCls = darkMode ? 'text-orange-200/80' : 'text-gray-700';
  const mutedCls = darkMode ? 'text-orange-300/60' : 'text-gray-500';
  const primaryBtn =
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none';
  const ghostBtn = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold border transition-all ${
    darkMode
      ? 'border-orange-800/40 text-orange-200 hover:bg-orange-900/20'
      : 'border-orange-200 text-gray-700 hover:bg-orange-50'
  }`;

  /* ---------------- Auth loading ---------------- */
  if (checkingAuth) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={bodyCls}>Checking your sign-in…</p>
        </div>
      </div>
    );
  }

  /* ---------------- Submitted ---------------- */
  if (submitted) {
    return (
      <div className={`min-h-screen ${pageBg}`}>
        <Navbar />
        <div className="py-28 px-4">
          <div className={`max-w-xl mx-auto p-8 rounded-2xl text-center ${cardCls}`}>
            <div className="w-16 h-16 rounded-2xl bg-green-500/15 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>
            <h1 className={`text-2xl font-black mb-3 ${headingCls}`}>Recording received</h1>
            <p className={`text-sm leading-relaxed mb-6 ${bodyCls}`}>
              Your {language} recording is in. Reviews happen in batches, so your score and tier
              will reach you by email within 3 months. Nothing else to do for now.
            </p>
            <button onClick={() => router.push('/challenge')} className={primaryBtn}>
              Back to the challenge
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ---------------- Main flow ---------------- */
  const stepIndex = step === 'language' ? 0 : step === 'script' ? 1 : 2;
  const stepLabels = ['Choose language', 'Read the script', 'Review and submit'];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${pageBg}`}>
      <Navbar />

      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex-1">
                <div
                  className={`h-1 rounded-full mb-2 ${
                    i <= stepIndex
                      ? 'bg-linear-to-r from-orange-500 to-red-600'
                      : darkMode ? 'bg-orange-900/40' : 'bg-orange-100'
                  }`}
                />
                <span className={`text-xs font-semibold ${i <= stepIndex ? (darkMode ? 'text-orange-300' : 'text-orange-600') : mutedCls}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-6 flex gap-3 p-4 rounded-xl border border-red-300 bg-red-50 text-red-700 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">{error}</p>
            </div>
          )}

          {/* Step 1 — language */}
          {step === 'language' && (
            <div className={`p-7 rounded-2xl ${cardCls}`}>
              <div className="flex items-center gap-2 mb-2">
                <Languages className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <h1 className={`text-2xl font-black ${headingCls}`}>Which language will you record in?</h1>
              </div>
              <p className={`text-sm mb-6 ${bodyCls}`}>
                Pick the language you speak most naturally, {user?.name?.split(' ')[0] || 'there'} — not the
                one you think sounds most impressive. Companies are hiring for native fluency.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-7">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-3 rounded-xl border text-sm font-semibold transition-all ${
                      language === lang
                        ? 'border-orange-500 bg-orange-500/15 text-orange-600 dark:text-orange-300'
                        : darkMode
                          ? 'border-orange-800/30 text-orange-200/80 hover:border-orange-700/50'
                          : 'border-orange-200 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button onClick={handleLanguageContinue} disabled={!language} className={primaryBtn}>
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2 — script + consent + record */}
          {step === 'script' && script && (
            <div className="space-y-5">
              <div className={`p-7 rounded-2xl ${cardCls}`}>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h1 className={`text-2xl font-black ${headingCls}`}>Read this out in {language}</h1>
                </div>
                <p className={`text-sm mb-5 ${bodyCls}`}>
                  Find a quiet room, switch the fan off, and hold your phone a hand's width from your
                  mouth. Recording runs for one minute and stops on its own — read at a natural pace,
                  and don't worry if you don't reach the end.
                </p>

                <div className={`p-5 rounded-xl mb-5 whitespace-pre-line leading-relaxed ${
                  darkMode ? 'bg-orange-900/20 text-orange-100' : 'bg-orange-50 text-gray-800'
                }`}>
                  {script.text}
                </div>

                <label className={`flex gap-3 items-start p-4 rounded-xl cursor-pointer ${
                  darkMode ? 'bg-orange-900/15' : 'bg-orange-50/60'
                }`}>
                  <input
                    type="checkbox"
                    checked={consented}
                    onChange={(e) => setConsented(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-orange-500 shrink-0"
                  />
                  <span className={`text-xs leading-relaxed ${bodyCls}`}>{CONSENT_TEXT}</span>
                </label>
              </div>

              <div className={`p-7 rounded-2xl text-center ${cardCls}`}>
                {!isRecording ? (
                  <>
                    <button
                      onClick={startRecording}
                      disabled={!consented}
                      className="w-20 h-20 rounded-full bg-linear-to-r from-orange-500 to-red-600 text-white flex items-center justify-center mx-auto mb-4 hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Start recording"
                    >
                      <Mic className="w-8 h-8" />
                    </button>
                    <p className={`text-sm font-semibold ${headingCls}`}>
                      {consented ? 'Tap to start recording' : 'Agree to the terms above to record'}
                    </p>
                    <p className={`text-xs mt-1 ${mutedCls}`}>Stops automatically after 1 minute</p>
                  </>
                ) : (
                  <>
                    <button
                      onClick={stopRecording}
                      className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-4 hover:bg-red-700 transition-all"
                      aria-label="Stop recording"
                    >
                      <Square className="w-7 h-7 fill-current" />
                    </button>
                    <div className={`text-3xl font-black tabular-nums ${headingCls}`}>
                      {formatTime(secondsLeft)}
                    </div>
                    <p className="text-xs mt-1 text-red-500 font-semibold">Recording — speak now</p>
                  </>
                )}
              </div>

              {!isRecording && (
                <button
                  onClick={() => { setStep('language'); setConsented(false); }}
                  className={ghostBtn}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change language
                </button>
              )}
            </div>
          )}

          {/* Step 3 — review + submit */}
          {step === 'review' && audioUrl && (
            <div className={`p-7 rounded-2xl ${cardCls}`}>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <h1 className={`text-2xl font-black ${headingCls}`}>Listen before you send it</h1>
              </div>
              <p className={`text-sm mb-5 ${bodyCls}`}>
                Play it back once. If there's background noise or you stumbled badly, record again —
                there's no penalty for retaking, and a clean take scores better.
              </p>

              <audio controls src={audioUrl} className="w-full mb-6" />

              <div className="flex flex-wrap gap-3">
                <button onClick={handleSubmit} disabled={uploading} className={primaryBtn}>
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? 'Submitting…' : 'Submit recording'}
                </button>
                <button onClick={resetRecording} disabled={uploading} className={ghostBtn}>
                  <RotateCcw className="w-4 h-4" />
                  Record again
                </button>
              </div>

              <p className={`text-xs mt-5 ${mutedCls}`}>
                Language: {language} · Script: {script?.id}
              </p>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}