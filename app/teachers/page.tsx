"use client";
import { 
  Heart, Sparkles, ArrowRight, 
  Users, Award, BookOpen, Globe, Star,
  MessageSquare, TrendingUp, CheckCircle, FileText
} from 'lucide-react';
import { useDarkMode } from '@/lib/DarkModeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function JoinAsCreator() {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      
      {/* Space for Navbar */}
      <div className="h-20"></div>

      {/* Hero Section */}
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
            <span className="text-sm font-medium">Something Special is Beginning</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            India Speaks Many Languages.
            <br />
            <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              But Not Everyone Can Share Them.
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-4 leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-700'
          }`}>
            We're building something different. Not another platform promising quick money.
            But a community where creators become trusted guides.
          </p>

          <p className={`text-base mb-6 ${darkMode ? 'text-orange-300/60' : 'text-gray-600'}`}>
            Teachers • Language Coaches • Content Creators • Authors • Publishers • Educational Institutions
          </p>
        </div>
      </section>

      {/* The Reality Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-3xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-100 shadow-xl'
          }`}>
            <h2 className={`text-3xl font-bold mb-5 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Here's the truth.
            </h2>
            
            <div className="space-y-5">
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                Right now, VartaLang doesn't have thousands of students waiting for you. We don't have a magic formula for instant income. We're not going to promise you ₹50,000 in your first month.
              </p>
              
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                What we do have is a vision: to make quality language education accessible across India. To connect learners who struggle to find good resources with creators who truly care about their craft—whether you're a teacher, author, coach, or institution.
              </p>
              
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                But here's what makes this interesting for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-10 text-center ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            You're Not Just Creating Content.
            <br />
            <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              You're Building Something.
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                icon: Award,
                title: 'Earn Your Credibility',
                description: 'Every student you teach, every course you create, every resource you share builds your reputation. When we launch the Varta Badge program (after 50+ creators and 500+ learners), you\'ll be among the first verified educators on the platform.'
              },
              {
                icon: Users,
                title: 'Your Content, Your Community',
                description: 'Build relationships with learners. Once you\'ve proven your quality through reviews and student success, you\'ll have the credibility to charge what you\'re worth—here or anywhere else. Your work becomes your portfolio.'
              },
              {
                icon: Award,
                title: 'Shape the Platform',
                description: 'Early creators don\'t just use VartaLang—they shape it. Your feedback influences what features we build. You help decide how content should work, what learners truly need, how the community grows.'
              },
              {
                icon: Globe,
                title: 'Be Part of the Mission',
                description: 'India has 22 official languages and hundreds of dialects. Millions want to learn but can\'t find quality resources. You\'re not just creating content—you\'re solving a real problem for real people across the country.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`p-7 rounded-2xl border transition-all ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <item.icon className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-base leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-3xl border ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-100'
          }`}>
            <h2 className={`text-3xl font-bold mb-7 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Here's How This Works
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'You Join & Create',
                  description: 'Share your story. Create your first course, upload study materials, publish your book, schedule mentorship sessions, or offer your institutional programs. Start building your presence on VartaLang.'
                },
                {
                  step: '02',
                  title: 'Learners Discover You',
                  description: 'As VartaLang grows, students find your content. They take your courses, download your materials, attend your sessions, leave reviews. Your profile becomes a portfolio of real impact—proof of work that speaks for itself.'
                },
                {
                  step: '03',
                  title: 'You Earn the Badge',
                  description: 'Once VartaLang reaches 50+ creators and 500+ learners—a milestone we\'ll hit together—the Varta Badge launches. Creators with proven track records get verified. This badge means something: you\'ve created real value for real learners.'
                },
                {
                  step: '04',
                  title: 'Opportunities Open Up',
                  description: 'With credibility comes choice. Monetize on VartaLang when we enable it. Take your verified status to other platforms. Companies looking for language content creators will see your proof of work. Publishers, institutions, brands—they all want verified creators. The badge is your credential.'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-5">
                  <div className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${
                    darkMode 
                      ? 'bg-orange-500/20 text-orange-300' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-base leading-relaxed ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-7 text-center ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            What You Can Do on VartaLang
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: BookOpen,
                title: 'Create Courses',
                description: 'Video lessons, structured programs, exam prep courses'
              },
              {
                icon: FileText,
                title: 'Share Resources',
                description: 'Upload books, notes, PDFs, study materials'
              },
              {
                icon: MessageSquare,
                title: 'Mentor Learners',
                description: '1:1 or group sessions for personalized guidance'
              },
              {
                icon: Globe,
                title: 'Give Feedback',
                description: 'Review pronunciation, assignments, practice work'
              },
              {
                icon: Star,
                title: 'Build Reputation',
                description: 'Earn reviews and ratings from real learners'
              },
              {
                icon: TrendingUp,
                title: 'Grow Together',
                description: 'Shape India\'s language learning future'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border text-center transition-all ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <item.icon className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Join Section */}

      {/* Who Should Join Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-7 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            This Is For You If...
          </h2>

          <div className="space-y-3">
            {[
              'You care more about learner success than quick profits',
              'You believe quality education should be accessible, not just expensive',
              'You\'re willing to invest time now to build something meaningful',
              'You want to be part of a community, not just a platform',
              'You have expertise in Indian languages and want to share it',
              'You\'re a teacher, coach, author, publisher, or educational institution',
              'You are okay with starting small to build credibility for bigger opportunities',
              'You want your work to create real impact, not just transactions'
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                  darkMode ? 'text-orange-400' : 'text-orange-600'
                }`} />
                <p className={`text-base ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Honest Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-3xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-100 shadow-xl'
          }`}>
            <h2 className={`text-3xl font-bold mb-5 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Let's Be Clear About What This Isn't
            </h2>
            
            <div className="space-y-3">
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                {'\u274C'} This is not a "get rich quick" platform
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                {'\u274C'} We're not promising immediate earnings or thousands of learners overnight
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                {'\u274C'} There's no guarantee of instant success or passive income
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                {'\u274C'} We're still building, still growing, still figuring things out
              </p>
              
              <div className="h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent my-6"></div>
              
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                {'\u2713'} This is about building credibility that lasts
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                {'\u2713'} It's about creating proof of your impact—verifiable, shareable, real
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                {'\u2713'} It's about being part of something that could transform language education in India
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                {'\u2713'} It's about investing in yourself and your future as a creator
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-5 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Together, We Can Make This Work
          </h2>
          
          <p className={`text-xl mb-6 leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
            When we reach 50+ creators and 500+ learners, VartaLang becomes real. 
            Monetization unlocks. The Varta Badge launches. Opportunities multiply.
          </p>

          <p className={`text-xl mb-10 leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
            But we need creators who believe in the mission. Creators who'll help bring those first 500 learners.
            Teachers, coaches, authors, institutions—people who'll create content that matters and build this community together.
          </p>

          <div className={`inline-block p-7 rounded-2xl border ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-200'
          }`}>
            <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              The question is simple:
            </h3>
            <p className={`text-xl ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              Do you want to be someone who was there from the beginning?
              <br />
              Someone who helped build this?
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-5 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Ready to Start Building?
          </h2>
          
          <p className={`text-xl mb-8 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
            Fill out this simple form. Tell us who you are, what you want to create, and why VartaLang.
            <br />
            We'll review and get back to you within 3-5 days.
          </p>

          <a
            href="https://forms.gle/ZntGjAdgjDJYe8Vm9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-linear-to-r from-orange-500 to-red-600 text-white text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
          >
            Join as a Creator
            <ArrowRight className="w-6 h-6" />
          </a>

          <p className={`mt-6 text-sm ${darkMode ? 'text-orange-200/60' : 'text-gray-500'}`}>
            No fees. No commitments. Just honest work and community building.
          </p>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-12 px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`p-7 rounded-2xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-100'
          }`}>
            <Heart className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            <p className={`text-lg italic leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
              "The best time to plant a tree was 20 years ago.
              <br />
              The second best time is now."
            </p>
            <p className={`mt-3 text-base ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              — Let's plant this together.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}