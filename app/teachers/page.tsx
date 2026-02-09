"use client";
import { 
  Heart, Sparkles, ArrowRight, 
  Users, Award, BookOpen, Target, Globe, Star,
  MessageSquare, TrendingUp, CheckCircle, FileText
} from 'lucide-react';
import { useDarkMode } from '@/lib/DarkModeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function JoinAsTeacher() {
  const { darkMode } = useDarkMode();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      
      {/* Space for Navbar */}
      <div className="h-20"></div>

      {/* Hero Section - The Story Begins */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
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
              But Not Everyone Can Teach Them.
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${
            darkMode ? 'text-orange-200/80' : 'text-gray-700'
          }`}>
            We're building something different. Not another platform promising quick money.
            <br />
            But a community where language teachers become trusted guides.
          </p>
        </div>
      </section>

      {/* The Reality Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-10 rounded-3xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-100 shadow-xl'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Here's the truth.
            </h2>
            
            <div className="space-y-6">
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                Right now, VartaLang doesn't have thousands of students waiting for you. We don't have a magic formula for instant income. We're not going to promise you ₹50,000 in your first month.
              </p>
              
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                What we do have is a vision: to make quality language education accessible across India. To connect learners who struggle to find good teachers with educators who truly care about their craft.
              </p>
              
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                But here's what makes this interesting for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            You're Not Just Teaching.
            <br />
            <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              You're Building Something.
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: Award,
                title: 'Earn Your Credibility',
                description: 'Every student you teach, every course you create, every feedback you give builds your reputation. When we launch the Varta Badge program (after 50+ teachers and 500+ students), you will be among the first verified educators.'
              },
              {
                icon: Users,
                title: 'Your Students, Your Terms',
                description: 'Build relationships with learners on the platform. Once you\'ve proven your teaching quality through reviews and student success, you\'ll have the credibility to charge what you\'re worth—here or anywhere else.'
              },
              {
                icon: Target,
                title: 'Shape the Platform',
                description: 'Early teachers don\'t just use VartaLang—they shape it. Your feedback influences what features we build. You help decide how teachers should be supported, how content should work, what learners truly need.'
              },
              {
                icon: Globe,
                title: 'Be Part of the Mission',
                description: 'India has 22 official languages and hundreds of dialects. Millions want to learn but can\'t find quality teachers. You\'re not just earning—you\'re solving a real problem for real people.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl mb-5 flex items-center justify-center ${
                  darkMode ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}>
                  <item.icon className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
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
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-10 rounded-3xl border ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-100'
          }`}>
            <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Here's How This Works
            </h2>

            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'You Join & Create',
                  description: 'Share your teaching story. Create your first course or upload study materials. Schedule mentorship sessions. Give pronunciation feedback to students. Start building your presence.'
                },
                {
                  step: '02',
                  title: 'Students Discover You',
                  description: 'As VartaLang grows, learners find your content. They take your courses. They book your sessions. They leave reviews. Your profile becomes a portfolio of real teaching impact.'
                },
                {
                  step: '03',
                  title: 'You Earn the Badge',
                  description: 'Once VartaLang reaches 50+ teachers and 500+ students—a milestone we will hit together—the Varta Badge launches. Teachers with proven track records get verified. This badge means something: you have taught real students, created real value.'
                },
                {
                  step: '04',
                  title: 'Opportunities Open Up',
                  description: 'With credibility comes choice. Monetize on VartaLang when we enable it. Take your verified status to other platforms. Start your own teaching practice. Companies looking for language trainers will see your proof of work. The badge is your credential.'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className={`shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                    darkMode 
                      ? 'bg-orange-500/20 text-orange-300' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
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
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            What You Can Do on VartaLang
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Create Courses',
                description: 'Build comprehensive learning paths for students'
              },
              {
                icon: MessageSquare,
                title: 'Mentor Students',
                description: '1:1 or group sessions for conversation practice'
              },
              {
                icon: FileText,
                title: 'Share Resources',
                description: 'Upload notes, PDFs, study materials'
              },
              {
                icon: Globe,
                title: 'Give Feedback',
                description: 'Review pronunciation recordings from learners'
              },
              {
                icon: Star,
                title: 'Build Reputation',
                description: 'Earn reviews and ratings from real students'
              },
              {
                icon: TrendingUp,
                title: 'Grow Together',
                description: 'Help shape India\'s language learning future'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border text-center transition-all ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-white border-orange-100 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center ${
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
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            This Is For You If...
          </h2>

          <div className="space-y-4">
            {[
              'You\'re a language teacher who cares more about student success than quick profits',
              'You believe quality education should be accessible, not just expensive',
              'You\'re willing to invest time now to build something meaningful',
              'You want to be part of a community, not just a platform',
              'You have expertise in any Indian language and want to share it',
              'You\'re okay with starting small to build credibility for bigger opportunities',
              'You want your teaching to create real impact, not just transactions'
            ].map((point: string, index: number) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-5 rounded-xl border transition-all ${
                  darkMode 
                    ? 'bg-orange-900/10 border-orange-800/30' 
                    : 'bg-white border-orange-100'
                }`}
              >
                <CheckCircle className={`w-6 h-6 shrink-0 mt-0.5 ${
                  darkMode ? 'text-orange-400' : 'text-orange-600'
                }`} />
                <p className={`text-base ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Honest Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`p-10 rounded-3xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-100 shadow-xl'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Let's Be Clear About What This Isn't
            </h2>
            
            <div className="space-y-4">
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                ❌ This is not a "get rich quick" platform
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                ❌ We're not promising immediate earnings or thousands of students overnight
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                ❌ There's no guarantee of instant success or passive income
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                ❌ We're still building, still growing, still figuring things out
              </p>
              
              <div className="h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent my-8"></div>
              
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                ✓ This is about building credibility that lasts
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                ✓ It's about creating proof of your teaching impact
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                ✓ It's about being part of something that could transform language education in India
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                ✓ It's about investing in yourself and your teaching future
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Together, We Can Make This Work
          </h2>
          
          <p className={`text-xl mb-8 leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
            When we reach 50+ teachers and 500+ students, VartaLang becomes real. 
            <br />
            Monetization unlocks. The Varta Badge launches. Opportunities multiply.
          </p>

          <p className={`text-xl mb-12 leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
            But we need teachers who believe in the mission.
            <br />
            Teachers who'll help bring those first 500 students.
            <br />
            Teachers who'll create content that matters.
          </p>

          <div className={`inline-block p-8 rounded-2xl border ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/20 border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-200'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
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
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
            Ready to Start Building?
          </h2>
          
          <p className={`text-xl mb-10 ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
            Fill out this form. Tell us about yourself, your teaching experience, and why you want to join VartaLang.
            <br />
            We'll review and get back to you within 3-5 days.
          </p>

          <a
            href="https://forms.gle/ZntGjAdgjDJYe8Vm9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-linear-to-r from-orange-500 to-red-600 text-white text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
          >
            Join as a Teacher
            <ArrowRight className="w-6 h-6" />
          </a>

          <p className={`mt-8 text-sm ${darkMode ? 'text-orange-200/60' : 'text-gray-500'}`}>
            No fees. No commitments. Just honest teaching and community building.
          </p>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-16 px-4 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`p-8 rounded-2xl border ${
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
            <p className={`mt-4 text-base ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
              — Let's plant this together.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}