"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  BookOpen,
  ArrowRight,
  MessageCircle,
  Users,
  Sparkles,
  Quote,
  ChevronDown,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is VartaLang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VartaLang is an Indian-language learning and opportunity platform. It brings together structured learning, real conversations with language partners, teachers and creators, and language-focused jobs, so people can move from studying a language to using it in life."
      }
    },
    {
      "@type": "Question",
      "name": "Is VartaLang free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Everything on VartaLang is currently free, including the language challenge, jobs board, matches, and chat. Paid courses with full mentor support and scenario-based Practice Labs are launching in December."
      }
    },
    {
      "@type": "Question",
      "name": "What is the VartaLang Language Challenge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Language Challenge is a short recording exercise where you read a script aloud in a chosen Indian language for one minute. Your recording is reviewed and scored, and results are shared by email within a few months."
      }
    },
    {
      "@type": "Question",
      "name": "What are Matches on VartaLang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Matches connect you with other users to practice speaking a language together, based on genuine compatibility rather than engagement algorithms."
      }
    },
    {
      "@type": "Question",
      "name": "How does chatting work on VartaLang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once you're matched with someone, you can message them directly through VartaLang's built-in chat to arrange practice sessions and stay in touch."
      }
    },
    {
      "@type": "Question",
      "name": "What are the paid courses and Practice Labs launching in December?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Starting in December, VartaLang is launching paid courses with full mentor support, along with scenario-based Practice Labs to help learners practice real-world language situations."
      }
    },
    {
      "@type": "Question",
      "name": "Can I teach on VartaLang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Teachers, language coaches, authors and institutions can apply as founding teachers to offer self-paced courses and live Language Labs. Founding teachers start with a 10% commission on courses, and can earn a higher revenue share as their students stay active."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Jobs board on VartaLang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Jobs board lists language-focused opportunities such as translation, teaching, interpretation, and content work. Employers post listings for free, and candidates contact them directly by email."
      }
    },
    {
      "@type": "Question",
      "name": "Is VartaLang safe to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safety is our foundation, not an afterthought. You can block a user or report inappropriate behavior at any time. We recommend keeping conversations on-platform and never sharing sensitive personal or financial information with someone you've just matched with."
      }
    },
    {
      "@type": "Question",
      "name": "How do I sign up for VartaLang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Go to the sign-up page, create a free account with your email, and you can start using VartaLang right away."
      }
    }
  ]
};

// Same Q&As shown as visible text below, kept in sync with the schema above.
const faqs = faqSchema.mainEntity.map((item) => ({
  question: item.name,
  answer: item.acceptedAnswer.text,
}));

export default function AboutPage() {
  const { darkMode } = useDarkMode();
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const story = [
    {
      year: '1982',
      title: 'A Foundation in Words',
      text: 'Four decades ago, Cosmo India Prakashan began preserving Indian knowledge and literature through traditional publishing. Words have always been our craft.'
    },
    {
      year: '2023',
      title: 'A Question Worth Asking',
      text: 'We noticed something. Millions of Indians understood languages but had nowhere safe to practice them. The barrier wasn\'t knowledge—it was confidence and opportunity.'
    },
    {
      year: '2026',
      title: 'Building Bridges',
      text: 'VartaLang was born not as a product, but as a bridge. It began as a space to practice languages through real conversations, built on respect and safety, and it is growing into learning, teaching and opportunity.'
    },
    {
      year: 'Today',
      title: 'Growing Into an Ecosystem',
      text: 'Today VartaLang brings together practice, learning, teachers and language careers. We\'re growing carefully, one learner and one teacher at a time.'
    }
  ];

  // The four parts of the platform and where each one stands today.
  const ecosystem = [
    {
      icon: BookOpen,
      title: 'Learn',
      status: 'Launching in December',
      text: 'Structured courses with mentor support and scenario-based Practice Labs, taking you from your first script toward confident use.'
    },
    {
      icon: MessageCircle,
      title: 'Practise',
      status: 'Live now',
      text: 'Match with language partners and chat directly to practise speaking with real people, at your own pace.'
    },
    {
      icon: GraduationCap,
      title: 'Teach',
      status: 'Founding teachers welcome',
      text: 'Teachers, coaches, authors and institutions can offer courses and live Language Labs, and reach learners across India.',
      href: '/teachers',
      linkLabel: 'Teach on VartaLang'
    },
    {
      icon: Briefcase,
      title: 'Discover',
      status: 'Live now',
      text: 'Find language-focused work such as translation, teaching, interpretation and content, and contact employers directly.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Safety First, Always',
      text: 'Respect isn\'t a feature. It\'s our foundation. Zero tolerance for anything less.'
    },
    {
      icon: MessageCircle,
      title: 'Conversation and Structure',
      text: 'Real progress comes from speaking with people and from guided learning. We make room for both, and for mistakes along the way.'
    },
    {
      icon: Users,
      title: 'People Over Metrics',
      text: 'We match based on genuine compatibility, not engagement algorithms.'
    }
  ];

  // Softer replacement for the old "What We're Not" section.
  const focus = [
    {
      label: 'Made for language learning',
      text: 'VartaLang is here to help you learn and use languages. Clear boundaries and safety tools keep every conversation focused on that.'
    },
    {
      label: 'Built around progress',
      text: 'We care about what you can do in a language next month, not how long you spend in the app.'
    },
    {
      label: 'Practice and learning together',
      text: 'Talk with real people, follow a course, or do both. Each part of VartaLang supports the others.'
    }
  ];

  const cardBase = darkMode
    ? 'bg-orange-900/10 border-orange-800/20'
    : 'bg-white border-orange-100';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      {/* FAQ structured data for search engines and AI assistants.
          Keep this in sync with the visible FAQ section below. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div
          className={`absolute top-20 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 transition-transform duration-1000 ${
            darkMode ? 'bg-orange-500' : 'bg-orange-300'
          }`}
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            darkMode
              ? 'bg-orange-900/20 text-orange-300'
              : 'bg-orange-100 text-orange-700'
          }`}>
            About us
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-relaxed ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            We believe language is a bridge,
            <br />
            not a barrier.
          </h1>

          <p className={`text-base md:text-lg leading-relaxed ${
            darkMode ? 'text-orange-200/70' : 'text-gray-600'
          }`}>
            VartaLang brings learning, conversation, teachers and career
            opportunities together, so people can move from studying an Indian
            language to using it in life.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className={`p-8 md:p-10 rounded-2xl border ${
            darkMode
              ? 'bg-orange-900/5 border-orange-800/20'
              : 'bg-white border-orange-100'
          }`}>
            <h2 className={`text-xl md:text-2xl font-bold mb-4 ${
              darkMode ? 'text-orange-100' : 'text-gray-900'
            }`}>
              Who we are
            </h2>
            <div className={`space-y-4 text-sm md:text-base leading-relaxed ${
              darkMode ? 'text-orange-200/80' : 'text-gray-600'
            }`}>
              <p>
                We're a small team that grew out of Cosmo India Prakashan, a publishing house
                that's been working with Indian languages for over forty years.
              </p>
              <p>
                We noticed something simple but important: people need safe spaces to actually
                speak, to make mistakes and to build confidence. They also need good teaching,
                and a reason to use the language once they have learned it.
              </p>
              <p>
                So VartaLang started with real conversations and grew from there. Today it
                connects practice, structured learning, teachers and language-focused work in
                one place, guided by mutual respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* One ecosystem */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-3 text-center ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            One platform, four ways to use it
          </h2>
          <p className={`text-base text-center mb-10 max-w-2xl mx-auto ${
            darkMode ? 'text-orange-200/70' : 'text-gray-600'
          }`}>
            Courses give you something to practise. Conversations give you experience.
            Teachers give you guidance. Jobs give your language skills somewhere to go.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {ecosystem.map((item, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border flex flex-col ${cardBase}`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                  }`}>
                    <item.icon className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    darkMode
                      ? 'bg-orange-900/30 text-orange-300'
                      : 'bg-orange-50 text-orange-700'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <h3 className={`text-lg font-bold mb-2 ${
                  darkMode ? 'text-orange-100' : 'text-gray-900'
                }`}>
                  {item.title}
                </h3>

                <p className={`text-sm leading-relaxed ${
                  darkMode ? 'text-orange-200/70' : 'text-gray-600'
                }`}>
                  {item.text}
                </p>

                {item.href && (
                  <Link
                    href={item.href}
                    className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${
                      darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'
                    }`}
                  >
                    {item.linkLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-orange-900/5' : 'bg-orange-50/50'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-12 text-center ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            Our journey
          </h2>

          <div className="space-y-12">
            {story.map((item, i) => (
              <div
                key={i}
                className={`relative pl-12 pb-8 border-l-2 transition-all duration-500 hover:border-l-4 ${
                  darkMode
                    ? 'border-orange-800/30 hover:border-orange-600'
                    : 'border-orange-200 hover:border-orange-400'
                }`}
              >
                <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full border-4 transition-all ${
                  darkMode
                    ? 'bg-orange-500 border-[#1a1410]'
                    : 'bg-orange-500 border-[#FFF9F5]'
                }`}></div>

                <div className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-2 ${
                  darkMode
                    ? 'bg-orange-900/30 text-orange-400'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {item.year}
                </div>

                <h3 className={`text-lg font-bold mb-2 ${
                  darkMode ? 'text-orange-100' : 'text-gray-900'
                }`}>
                  {item.title}
                </h3>

                <p className={`text-sm md:text-base leading-relaxed ${
                  darkMode ? 'text-orange-200/70' : 'text-gray-600'
                }`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            What we believe
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border transition-all hover:scale-105 ${cardBase}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                }`}>
                  <value.icon className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>

                <h3 className={`text-base font-bold mb-2 ${
                  darkMode ? 'text-orange-100' : 'text-gray-900'
                }`}>
                  {value.title}
                </h3>

                <p className={`text-sm leading-relaxed ${
                  darkMode ? 'text-orange-200/70' : 'text-gray-600'
                }`}>
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-orange-900/5' : 'bg-orange-50/50'}`}>
        <div className="max-w-2xl mx-auto">
          <div className={`p-8 md:p-10 rounded-2xl border relative overflow-hidden ${
            darkMode
              ? 'bg-orange-900/5 border-orange-800/20'
              : 'bg-white border-orange-100'
          }`}>
            <Quote className={`absolute top-4 left-4 w-8 h-8 opacity-5 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`} />

            <div className="relative z-10">
              <div className="mb-6">
                <p className={`text-sm font-medium mb-1 ${
                  darkMode ? 'text-orange-300/70' : 'text-gray-500'
                }`}>
                  A note from the founder
                </p>
                <p className={`text-base font-semibold ${
                  darkMode ? 'text-orange-200' : 'text-gray-800'
                }`}>
                  Dhawal Shukla
                </p>
              </div>

              <div className={`space-y-4 text-sm md:text-base leading-relaxed ${
                darkMode ? 'text-orange-200/80' : 'text-gray-600'
              }`}>
                <p>
                  "I didn't build VartaLang as just an engineer. I built it as someone who's
                  seen the cost of linguistic barriers—lost opportunities, missed connections,
                  cultural isolation."
                </p>

                <p>
                  This platform exists because language is more than words. It's the ability
                  to connect, to work, to belong.
                </p>

                <p>
                  We're not trying to be the biggest. We're trying to be the most useful,
                  the most respectful, the most human.
                </p>

                <div className={`pt-4 mt-4 border-t ${darkMode ? 'border-orange-800/20' : 'border-orange-100'}`}>
                  <p className={`text-sm italic ${
                    darkMode ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    "Every conversation on VartaLang is a small bridge between cultures."
                  </p>
                </div>
              </div>
            </div>

            <Quote className={`absolute bottom-4 right-4 w-8 h-8 opacity-5 rotate-180 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`} />
          </div>
        </div>
      </section>

      {/* How we keep VartaLang focused (replaces "What We're Not") */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            What VartaLang is for
          </h2>

          <div className="space-y-4">
            {focus.map((item, i) => (
              <div key={i} className={`p-5 rounded-xl border ${cardBase}`}>
                <p className={`text-sm font-bold mb-1 ${
                  darkMode ? 'text-orange-300' : 'text-orange-700'
                }`}>
                  {item.label}
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-orange-200/70' : 'text-gray-600'
                }`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - visible text, kept in sync with faqSchema above */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-orange-900/5' : 'bg-orange-50/50'}`}>
        <div className="max-w-2xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            Frequently asked questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border overflow-hidden transition-all ${
                    darkMode
                      ? 'bg-orange-900/5 border-orange-800/20'
                      : 'bg-white border-orange-100'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className={`text-sm md:text-base font-semibold ${
                      darkMode ? 'text-orange-100' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''} ${
                        darkMode ? 'text-orange-400' : 'text-orange-600'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4">
                      <p className={`text-sm md:text-base leading-relaxed ${
                        darkMode ? 'text-orange-200/70' : 'text-gray-600'
                      }`}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
            darkMode ? 'bg-orange-500/20' : 'bg-orange-100'
          }`}>
            <Sparkles className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>

          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            Join our community
          </h2>

          <p className={`text-base mb-8 ${
            darkMode ? 'text-orange-200/70' : 'text-gray-600'
          }`}>
            Learn, practise, teach or find your next language opportunity.
            Safe, respectful, and built to help you use the languages you love.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-base
              bg-linear-to-r from-orange-500 to-red-600 text-white
              hover:shadow-xl hover:scale-105 transition-all"
            >
              Get started
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/teachers"
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-base border transition-all ${
                darkMode
                  ? 'border-orange-700/50 text-orange-300 hover:bg-orange-900/20'
                  : 'border-orange-300 text-orange-700 hover:bg-orange-50'
              }`}
            >
              Teach on VartaLang
            </Link>
          </div>

          <p className={`mt-4 text-sm ${darkMode ? 'text-orange-300/50' : 'text-gray-500'}`}>
            Free to join • No credit card required
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}