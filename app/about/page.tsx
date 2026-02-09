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
  Quote
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

export default function AboutPage() {
  const { darkMode } = useDarkMode();
  const [scrollY, setScrollY] = useState(0);

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
      text: 'VartaLang was born not as a product, but as a bridge. A space where people could practice languages through real conversations, built on respect and safety.'
    },
    {
      year: 'Today',
      title: 'Growing Quietly',
      text: 'We\'re not chasing viral growth. We\'re building something that lasts—one conversation, one connection, one learner at a time.'
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
      title: 'Real Practice, Real Progress',
      text: 'Learning happens through conversation and mistakes, not exams and scores.'
    },
    {
      icon: Users,
      title: 'People Over Metrics',
      text: 'We match based on genuine compatibility, not engagement algorithms.'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />

      {/* Gentle Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Subtle Background */}
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
            About Us
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
            VartaLang exists to connect people across India's languages—
            through real conversations, genuine respect, and safe practice.
          </p>
        </div>
      </section>

      {/* Who We Are - Simple Introduction */}
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
              Who We Are
            </h2>
            <div className={`space-y-4 text-sm md:text-base leading-relaxed ${
              darkMode ? 'text-orange-200/80' : 'text-gray-600'
            }`}>
              <p>
                We're a small team that grew out of Cosmo India Prakashan, a publishing house 
                that's been working with Indian languages for over forty years.
              </p>
              <p>
                We noticed something simple but important: people don't need more grammar lessons. 
                They need safe spaces to actually speak. To make mistakes. To build confidence.
              </p>
              <p>
                So we built VartaLang—a place where learning happens through real conversations 
                with real people, guided by mutual respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-12 text-center ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            Our Journey
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
                {/* Year Dot */}
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
      <section className={`py-16 px-4 ${
        darkMode ? 'bg-orange-900/5' : 'bg-orange-50/50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            What We Believe
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div 
                key={i}
                className={`p-6 rounded-xl border transition-all hover:scale-105 ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/20' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  darkMode 
                    ? 'bg-orange-500/20' 
                    : 'bg-orange-100'
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
      <section className="py-16 px-4">
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
                  A Note from the Founder
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

      {/* What We're Not */}
      <section className={`py-16 px-4 ${
        darkMode ? 'bg-orange-900/5' : 'bg-orange-50/50'
      }`}>
        <div className="max-w-2xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            What We're Not
          </h2>

          <div className="space-y-4">
            {[
              { label: 'Not a dating app', text: 'We\'re here for language learning, with clear boundaries and safety measures.' },
              { label: 'Not entertainment', text: 'We prioritize actual progress over gamification and engagement metrics.' },
              { label: 'Not a classroom', text: 'Learning happens through real conversations, not lectures and exams.' }
            ].map((item, i) => (
              <div 
                key={i}
                className={`p-5 rounded-xl border ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/20' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <p className={`text-sm font-bold mb-1 ${
                  darkMode ? 'text-red-400' : 'text-red-600'
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

      {/* Gentle CTA */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
            darkMode 
              ? 'bg-orange-500/20' 
              : 'bg-orange-100'
          }`}>
            <Sparkles className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>

          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
            darkMode ? 'text-orange-100' : 'text-gray-900'
          }`}>
            Join Our Community
          </h2>

          <p className={`text-base mb-8 ${
            darkMode ? 'text-orange-200/70' : 'text-gray-600'
          }`}>
            Start learning through real conversations.
            Safe, respectful, and effective.
          </p>

          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-base
            bg-linear-to-r from-orange-500 to-red-600 text-white
            hover:shadow-xl hover:scale-105 transition-all"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className={`mt-4 text-sm ${darkMode ? 'text-orange-300/50' : 'text-gray-500'}`}>
            Free to join • No credit card required
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}