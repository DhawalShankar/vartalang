"use client";
import {
  ArrowRight, BookOpen, Users, Globe, CheckCircle,
  Video, Award, TrendingUp, MessageSquare, Wallet, Sparkles
} from 'lucide-react';
import { useDarkMode } from '@/lib/DarkModeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const FORM_URL = "https://forms.gle/ZntGjAdgjDJYe8Vm9";

export default function JoinAsCreator() {
  const { darkMode } = useDarkMode();

  const card = darkMode
    ? 'bg-orange-900/10 border-orange-800/30'
    : 'bg-white border-orange-100 shadow-sm';
  const heading = darkMode ? 'text-orange-50' : 'text-gray-900';
  const body = darkMode ? 'text-orange-200/80' : 'text-gray-700';
  const muted = darkMode ? 'text-orange-200/70' : 'text-gray-600';
  const iconBox = darkMode ? 'bg-orange-500/20' : 'bg-orange-50';
  const iconColor = darkMode ? 'text-orange-400' : 'text-orange-600';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />

      {/* Space for Navbar */}
      <div className="h-20"></div>

      {/* Hero */}
      <section className="pt-16 pb-12 px-4 relative overflow-hidden">
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-200/40'
        }`}></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 border ${
            darkMode
              ? 'bg-orange-900/20 border-orange-800/40 text-orange-300'
              : 'bg-orange-50 border-orange-200 text-orange-700'
          }`}>
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Founding teacher program</span>
          </div>

          <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${heading}`}>
            Teach Indian languages on VartaLang.
            <br />
            <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Keep 90% of every course.
            </span>
          </h1>

          <p className={`text-xl md:text-2xl mb-4 leading-relaxed ${body}`}>
            We are opening VartaLang to its first teachers. You sell courses and run live
            practice sessions. We handle payments, scheduling and reach.
          </p>

          <p className={`text-base mb-8 ${darkMode ? 'text-orange-300/60' : 'text-gray-600'}`}>
            For teachers, language coaches, authors and institutions
          </p>

          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-orange-500 to-red-600 text-white text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all"
          >
            Apply as a founding teacher
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Why now */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-3xl border ${card}`}>
            <h2 className={`text-3xl font-bold mb-5 ${heading}`}>
              Why join now
            </h2>
            <div className="space-y-4">
              <p className={`text-lg leading-relaxed ${body}`}>
                There are no professional teachers on VartaLang yet. That means the first
                teachers to join get full visibility with no one competing for the same
                learners.
              </p>
              <p className={`text-lg leading-relaxed ${body}`}>
                Founding teachers also help decide how pricing works and how Language Labs
                are run. When we open the platform to more teachers, the standard you set
                becomes the standard everyone follows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue split */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-3 text-center ${heading}`}>
            How you earn
          </h2>
          <p className={`text-lg text-center mb-10 ${muted}`}>
            Three ways to earn, and a share that grows as your students stay active.
          </p>

          {/* Split bar */}
          <div className={`p-7 rounded-2xl border mb-8 ${card}`}>
            <p className={`text-sm font-semibold mb-3 ${muted}`}>
              On every self-paced course you sell
            </p>
            <div className="flex h-14 rounded-xl overflow-hidden text-white font-bold">
              <div className="basis-[90%] bg-linear-to-r from-orange-500 to-red-600 flex items-center justify-center">
                You keep 90%
              </div>
              <div className={`basis-[10%] flex items-center justify-center text-sm ${
                darkMode ? 'bg-orange-900/60' : 'bg-orange-300 text-orange-950'
              }`}>
                10%
              </div>
            </div>
            <p className={`text-sm mt-3 ${muted}`}>
              10% is the starting commission for founding teachers. It goes toward payments,
              hosting and bringing learners to your course.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={`p-7 rounded-2xl border ${card}`}>
              <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${iconBox}`}>
                <BookOpen className={`w-7 h-7 ${iconColor}`} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${heading}`}>Courses</h3>
              <p className={`text-base leading-relaxed ${muted}`}>
                Upload structured language lessons and videos. Learners pay once and learn at
                their own pace. You keep 90% of each sale.
              </p>
            </div>

            <div className={`p-7 rounded-2xl border ${card}`}>
              <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${iconBox}`}>
                <Video className={`w-7 h-7 ${iconColor}`} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${heading}`}>Language Labs</h3>
              <p className={`text-base leading-relaxed ${muted}`}>
                Run live conversation and practice sessions, one-off or as ongoing cohorts.
                You set the price for each session or package. We add our commission on top
                and the rest goes straight to you.
              </p>
            </div>

            <div className={`p-7 rounded-2xl border ${card}`}>
              <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${iconBox}`}>
                <Users className={`w-7 h-7 ${iconColor}`} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${heading}`}>Your own students</h3>
              <p className={`text-base leading-relaxed ${muted}`}>
                Bring the students you already teach. When at least 50 of them use VartaLang
                regularly, we raise your revenue share on each course above 90%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No cold start */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-3xl border ${
            darkMode
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30'
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-100'
          }`}>
            <div className="flex items-start gap-5">
              <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                darkMode ? 'bg-orange-500/20' : 'bg-white'
              }`}>
                <MessageSquare className={`w-7 h-7 ${iconColor}`} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold mb-3 ${heading}`}>
                  You don't start from zero
                </h2>
                <p className={`text-lg leading-relaxed ${body}`}>
                  VartaLang already has users who chat and translate across languages. When a
                  learner shows interest in learning a language, we send them to the labs and
                  courses for that language. You get learners from your own audience and from
                  ours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-8 text-center ${heading}`}>
            How to get started
          </h2>

          <div className="space-y-5">
            {[
              {
                step: '1',
                title: 'Apply with the short form',
                description: 'Tell us your language, your teaching experience and what you want to offer. We reply within 3-5 days.'
              },
              {
                step: '2',
                title: 'We onboard you',
                description: 'We walk you through the exact commission tiers, set up your profile and help you publish your first course or lab.'
              },
              {
                step: '3',
                title: 'Bring your students, or start with ours',
                description: 'Invite your existing students. We also route interested learners from the platform to your courses and labs.'
              },
              {
                step: '4',
                title: 'Get paid',
                description: 'VartaLang handles payments and scheduling. Your share is paid out to you, and it can increase as your students stay active.'
              }
            ].map((item) => (
              <div key={item.step} className={`flex gap-5 p-6 rounded-2xl border ${card}`}>
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                  darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                }`}>
                  {item.step}
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-1 ${heading}`}>{item.title}</h3>
                  <p className={`text-base leading-relaxed ${muted}`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-3xl border ${card}`}>
            <div className="flex items-start gap-5">
              <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${iconBox}`}>
                <Award className={`w-7 h-7 ${iconColor}`} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold mb-3 ${heading}`}>
                  Optional: certificates for your learners
                </h2>
                <p className={`text-lg leading-relaxed ${body}`}>
                  Learners who finish your course or lab can receive a VartaLang certificate.
                  It adds value to your program and needs no extra work from you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we handle vs what you do */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-7 rounded-2xl border ${card}`}>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className={`w-6 h-6 ${iconColor}`} />
                <h3 className={`text-xl font-bold ${heading}`}>You do</h3>
              </div>
              <ul className={`space-y-2 text-base ${body}`}>
                <li>Teach and create your course or lab</li>
                <li>Set your prices for labs</li>
                <li>Invite the students you already have</li>
              </ul>
            </div>
            <div className={`p-7 rounded-2xl border ${card}`}>
              <div className="flex items-center gap-3 mb-4">
                <Wallet className={`w-6 h-6 ${iconColor}`} />
                <h3 className={`text-xl font-bold ${heading}`}>We do</h3>
              </div>
              <ul className={`space-y-2 text-base ${body}`}>
                <li>Collect payments and pay you out</li>
                <li>Handle scheduling for live sessions</li>
                <li>Bring learners from the VartaLang community</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who should apply */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-7 ${heading}`}>
            This is a good fit if you
          </h2>

          <div className="space-y-3">
            {[
              'Teach an Indian language and want to reach learners across the country',
              'Already have students and want a place to teach and get paid online',
              'Want to run live practice sessions as well as recorded courses',
              'Are a teacher, coach, author, publisher or educational institution',
              'Would like a say in how pricing and Language Labs work from the start'
            ].map((item, index) => (
              <div key={index} className={`flex items-start gap-4 p-4 rounded-xl border ${card}`}>
                <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
                <p className={`text-base ${body}`}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest note */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-3xl border ${card}`}>
            <div className="flex items-start gap-5">
              <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${iconBox}`}>
                <Globe className={`w-7 h-7 ${iconColor}`} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold mb-3 ${heading}`}>
                  What to expect
                </h2>
                <p className={`text-lg leading-relaxed mb-3 ${body}`}>
                  VartaLang is still early. We cannot promise a fixed income or a set number
                  of learners. What we can promise is a low starting commission, a clear
                  revenue share that improves as your students engage, and direct access to
                  the team while we build.
                </p>
                <p className={`text-lg leading-relaxed ${body}`}>
                  If you are interested, we will go through the exact tiers with you before
                  you commit to anything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-5 ${heading}`}>
            Become a founding teacher
          </h2>

          <p className={`text-xl mb-8 ${body}`}>
            Fill out the short form with your language, your experience and what you want to
            teach. We will reply within 3-5 days.
          </p>

          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-linear-to-r from-orange-500 to-red-600 text-white text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
          >
            Apply as a founding teacher
            <ArrowRight className="w-6 h-6" />
          </a>

          <p className={`mt-6 text-sm ${darkMode ? 'text-orange-200/60' : 'text-gray-500'}`}>
            No joining fee. Applying does not commit you to anything.
          </p>
        </div>
      </section>

      <div className="mb-8"></div>
      <Footer />
    </div>
  );
}