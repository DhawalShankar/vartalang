"use client";

import Link from 'next/link';
import {
  ArrowRight, Mic, Shield, Eye, Clock, Mail, CheckCircle,
  Briefcase, Headphones, Radio, Heart,
  Lock, Compass, ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

// TODO: replace with the real VartaLang support address before deploying
const PROTECT_EMAIL = 'hello@vartalang.in';
const PROTECT_SUBJECT = 'Voice Challenge: voice protection request';

export default function VoiceChallengeIntro() {
  const { darkMode } = useDarkMode();

  const languages = [
    'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali',
    'Gujarati', 'Punjabi', 'Marathi', 'Odia', 'Assamese', 'Urdu',
    '+ 10 more, plus English'
  ];

  const steps = [
    {
      icon: Mic,
      title: 'Record',
      body: 'Pick your language and read a short script — about 5 minutes, from your phone or laptop.',
    },
    {
      icon: Clock,
      title: 'Reviewed',
      body: 'Recordings are checked for clarity and accuracy in batches, not instantly — we\'d rather review properly than rush it.',
    },
    {
      icon: Mail,
      title: 'Score by email',
      body: 'You\'ll get your result and tier by email within 3 months. No live leaderboard, no instant score.',
    },
    {
      icon: Eye,
      title: 'Get discovered',
      body: 'If a verified company hiring for voice/language work is interested after listening, we\'ll tell you — you decide if you want to connect.',
    },
  ];

  const whyParticipate = [
    {
      icon: Briefcase,
      title: 'A real shot at real work',
      body: 'Companies hiring for voiceover, dubbing, IVR, and regional-language customer support are short on talent outside the usual metro agencies. This is a way to be found.',
    },
    {
      icon: Lock,
      title: 'Your identity stays yours',
      body: 'Companies can listen to a recording once — no name, no number, no email. You only get contacted, and identity is only shared, if you say yes.',
    },
    {
      icon: Shield,
      title: 'Nothing to pay, nothing to lose',
      body: 'Free to enter, free to withdraw. We don\'t sell your recording, and we don\'t charge companies to "unlock" your voice either.',
    },
    {
      icon: Headphones,
      title: 'A sample worth having anyway',
      body: 'Even if nothing comes of it immediately, you walk away with a clean, structured voice recording — useful for your own portfolio or future auditions.',
    },
  ];

  const industryReasons = [
    {
      stat: '22+1',
      label: 'languages, one industry gap',
      body: 'India has 22 scheduled languages and hundreds of millions of speakers who are more comfortable in their own tongue than in English — but most voice and language work still gets routed through a handful of metro agencies.',
    },
    {
      stat: 'OTT & dubbing',
      label: 'is scaling fast',
      body: 'Streaming platforms now dub and subtitle into ten-plus Indian languages as standard practice, not an afterthought — that needs a much wider talent pool than exists today.',
    },
    {
      stat: 'Voice bots & IVR',
      label: 'are going regional',
      body: 'Customer support, banking, and government services are increasingly expected to work in regional languages, not just Hindi and English — that\'s real, ongoing hiring demand.',
    },
  ];

  const frameworkControls = [
    'Human use only, or AI use',
    'Who can license your voice',
    'Which industries can use it',
    'Which applications are permitted',
    'Where it can be used',
    'For how long',
    'Whether it can be used for AI training',
    'Whether it can be cloned',
    'Whether it can be sublicensed',
    'How you share in the revenue it generates',
  ];

  const protectRequests = [
    'Ask how your recording is stored and who can listen to it',
    'Report a recording or clip you think is your voice being misused',
    'Ask us to remove your recording from the challenge',
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>

      <Navbar />

      {/* Hero */}
      <section className="pt-30 pb-10 px-4 relative overflow-hidden">
        <div
          aria-hidden="true"
          className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            darkMode ? 'bg-orange-500' : 'bg-orange-200'
          }`}
        ></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 ${
            darkMode ? 'bg-orange-900/20 text-orange-300' : 'bg-orange-100 text-orange-700'
          }`}>
            <Radio className="w-4 h-4" aria-hidden="true" />
            A VartaLang Community Initiative
          </div>

          <h1 className={`text-4xl lg:text-5xl font-black mb-4 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            The Great Indian
            <br />
            <span className={darkMode ? 'text-orange-400' : 'text-orange-600'}>Voice Challenge</span>
          </h1>

          <p className={`text-lg mb-6 max-w-2xl mx-auto leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-700'
          }`}>
            Record your voice in your own language. Get evaluated properly, and get a real chance
            at being noticed by companies hiring for voice and language work — no experience needed.
          </p>

          <div className={`text-sm mb-8 max-w-xl mx-auto px-4 py-3 rounded-xl border ${
            darkMode
              ? 'bg-orange-900/10 border-orange-800/30 text-orange-200/70'
              : 'bg-orange-50 border-orange-200 text-gray-600'
          }`}>
            No entry fee. No prize money, no lottery — this is about getting discovered, not
            winning something. Nobody is guaranteed a job.
          </div>

          <Link
            href="/challenge/start"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-base bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-xl hover:scale-105 transition-all"
          >
            Start the Challenge
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>

          <p className={`text-xs mt-3 ${darkMode ? 'text-orange-300/50' : 'text-gray-500'}`}>
            Free · Takes about 5 minutes · You'll need to sign in first
          </p>
        </div>
      </section>

      {/* Languages strip */}
      <section className={`py-4 border-y ${darkMode ? 'border-orange-900/30 bg-[#1a1410]' : 'border-orange-100 bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-2">
          {languages.map((lang) => (
            <span
              key={lang}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${
                darkMode
                  ? 'bg-orange-900/20 border-orange-800/30 text-orange-200'
                  : 'bg-white border-orange-100 text-gray-700 shadow-sm'
              }`}
            >
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-2xl lg:text-3xl font-black mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              How it works
            </h2>
            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Honestly — this takes a few months to close the loop, not a few minutes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`p-5 rounded-xl border relative ${
                  darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-200 shadow-sm'
                }`}
              >
                <span className={`text-2xl font-black mb-2 block ${darkMode ? 'text-orange-500/40' : 'text-orange-300'}`}>
                  {i + 1}
                </span>
                <step.icon className={`w-5 h-5 mb-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} aria-hidden="true" />
                <h3 className={`font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-snug ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why participate */}
      <section className={`py-14 px-4 ${darkMode ? 'bg-[#1f1612]' : 'bg-orange-50/30'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-2xl lg:text-3xl font-black mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Why participate
            </h2>
            <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              What you actually get out of five minutes of recording
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {whyParticipate.map((item) => (
              <div
                key={item.title}
                className={`p-5 rounded-xl border flex gap-4 ${
                  darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-200 shadow-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                }`}>
                  <item.icon className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className={`font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why the language/voice industry matters */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-2xl lg:text-3xl font-black mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Why this industry, why now
            </h2>
            <p className={`text-sm max-w-xl mx-auto ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              India's language and voice work is growing faster than the talent pipeline behind it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {industryReasons.map((item) => (
              <div
                key={item.label}
                className={`p-6 rounded-xl border ${
                  darkMode ? 'bg-orange-900/10 border-orange-800/30' : 'bg-white border-orange-200 shadow-sm'
                }`}
              >
                <div className={`text-2xl font-black mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {item.stat}
                </div>
                <div className={`text-sm font-semibold mb-3 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                  {item.label}
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why VartaLang is doing this — the transparency section */}
      <section className={`py-14 px-4 ${darkMode ? 'bg-[#1f1612]' : 'bg-orange-50/30'}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-2xl border ${
            darkMode
              ? 'bg-orange-900/10 border-orange-800/30'
              : 'bg-white border-orange-200 shadow-lg'
          }`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-5 ${
              darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
            }`}>
              <Heart className="w-4 h-4" aria-hidden="true" />
              Why we're actually doing this
            </div>

            <h2 className={`text-2xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Not a revenue play — a discoverability problem we're trying to fix
            </h2>

            <div className={`space-y-4 text-sm leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              <p>
                Good voice talent exists in every Indian town and city, in every language — but almost
                none of it is visible to the companies that need it. Hiring for voice and language work
                still runs through a small, repeat set of metro agencies. We think that's a discovery
                problem, not a talent problem.
              </p>
              <p>
                This challenge doesn't make VartaLang money directly. We don't sell raw recordings, we
                don't charge candidates anything, and we don't run a pay-to-listen model for companies
                either. The only fee anywhere in this flow is a small, flat, one-time verification charge
                on the company side — purely to keep out fake accounts, not tied to how much they browse
                or listen.
              </p>
              <p>
                What we're actually building is a clean, consent-based way for Indian voice talent to be
                heard by people who are genuinely hiring — and, over time, a properly-consented picture of
                how Indian languages are actually spoken, which barely exists today.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-6">
              {[
                { icon: CheckCircle, text: 'No cash prize or lottery' },
                { icon: Lock, text: 'Your identity, your call' },
                { icon: Shield, text: 'No sale of raw recordings' },
              ].map((item) => (
                <div key={item.text} className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                  darkMode ? 'bg-orange-900/20 text-orange-200' : 'bg-orange-50 text-gray-700'
                }`}>
                  <item.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Protect your voice — request-based, research phase */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-2xl border ${
            darkMode
              ? 'bg-orange-900/10 border-orange-800/30'
              : 'bg-white border-orange-200 shadow-lg'
          }`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-5 ${
              darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
            }`}>
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              Voice protection
            </div>

            <h2 className={`text-2xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Want your voice protected? Write to us.
            </h2>

            <div className={`space-y-4 text-sm leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              <p>
                By default, your recording is only used to connect you with companies hiring for voice
                and language work. If you'd like extra care taken with your voice, you can ask us directly.
              </p>
              <p>
                We're still researching voice protection and misuse checks, so for now this is a
                request-based process, not an automatic service. We can't promise to find every place a
                voice is used, or to prove that a voice was cloned by AI — but we will look into what you
                report and tell you honestly what we find.
              </p>
            </div>

            <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-orange-800/30' : 'border-orange-100'}`}>
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                The framework we're working toward
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                Just as an author works with a publisher to control how their work is published and
                licensed, a voice artist should be able to decide how their voice is used. You should
                be able to decide:
              </p>

              <ul className="grid sm:grid-cols-2 gap-2">
                {frameworkControls.map((text) => (
                  <li
                    key={text}
                    className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                      darkMode ? 'bg-orange-900/20 text-orange-200' : 'bg-orange-50 text-gray-700'
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 shrink-0 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}
                      aria-hidden="true"
                    />
                    {text}
                  </li>
                ))}
              </ul>

              <p className={`text-sm leading-relaxed mt-4 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                If you don't want AI to use your voice, that's completely okay. You can remain a human
                voice artist and be hired for dubbing, narration, cinema, OTT, advertising and other
                work. If you choose to take part in AI, you should do it on your terms.
              </p>
              <p className={`text-sm leading-relaxed mt-3 font-semibold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                This is the framework we want to build with voice artists, lawyers, linguists and
                researchers. It is not live today.
              </p>
            </div>

            <p className={`text-sm font-semibold mt-8 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Until then, you can ask us:
            </p>

            <ul className="mt-3 space-y-2">
              {protectRequests.map((text) => (
                <li
                  key={text}
                  className={`flex items-start gap-2 text-sm ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}
                >
                  <CheckCircle
                    className={`w-4 h-4 mt-0.5 shrink-0 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}
                    aria-hidden="true"
                  />
                  {text}
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${PROTECT_EMAIL}?subject=${encodeURIComponent(PROTECT_SUBJECT)}`}
              className={`inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-bold text-sm border transition-all hover:scale-105 ${
                darkMode
                  ? 'border-orange-500/50 text-orange-300 hover:bg-orange-500/10'
                  : 'border-orange-300 text-orange-700 hover:bg-orange-50'
              }`}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Email us at {PROTECT_EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-[#1f1612]' : 'bg-orange-50/30'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-3xl font-black mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Five minutes. Your language. Your voice.
          </h2>
          <p className={`text-base mb-8 ${darkMode ? 'text-orange-200/80' : 'text-gray-600'}`}>
            Nothing to lose, nothing to pay — just a real chance to be heard by people who are hiring.
          </p>

          <Link
            href="/challenge/start"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-black text-lg bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start the Challenge
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mt-10">
            {[
              { icon: Compass, text: 'Record' },
              { icon: Clock, text: 'Reviewed' },
              { icon: Mail, text: 'Scored' },
              { icon: Briefcase, text: 'Discovered' },
            ].map((item) => (
              <div key={item.text} className={`p-3 rounded-lg ${darkMode ? 'bg-orange-900/20' : 'bg-white shadow'}`}>
                <item.icon className={`w-5 h-5 mx-auto mb-1.5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} aria-hidden="true" />
                <div className={`text-xs font-bold ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}