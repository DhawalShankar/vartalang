"use client";
import { useState, useEffect } from 'react';
import { Heart, Users, Shield, BookOpen, Sparkles, Quote, ArrowRight, Globe, Target, Feather } from 'lucide-react';
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

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      
      <Navbar />

      {/* Hero Section with Parallax */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Cinematic Background Elements */}
        <div 
          className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl transition-transform duration-1000 ${
            darkMode ? 'bg-orange-900/20' : 'bg-orange-200/30'
          }`}
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className={`absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl transition-transform duration-1000 ${
            darkMode ? 'bg-red-900/20' : 'bg-red-200/30'
          }`}
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        ></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Sanskrit Shloka Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border ${
            darkMode 
              ? 'bg-orange-900/20 border-orange-800/40 text-orange-300' 
              : 'bg-orange-50 border-orange-200 text-orange-700'
          }`}>
            <Feather className="w-4 h-4" />
            <span className="text-sm font-semibold">About VartaLang</span>
          </div>

          <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            भाषा नहीं,
            <br />
            <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              सेतु है यह
            </span>
          </h1>

          <p className={`text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed italic ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            Not just a language platform—a bridge between hearts
          </p>
        </div>
      </section>

      {/* Sanskrit Shloka Section */}
      <section className={`py-16 px-4 border-y ${darkMode ? 'border-orange-900/30' : 'border-orange-100'}`}>
        <div className="max-w-3xl mx-auto">
          <div className={`relative p-10 rounded-3xl ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/10 border border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border border-orange-100'
          }`}>
            <Quote className={`absolute top-6 left-6 w-10 h-10 opacity-20 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`} />
            
            <div className="text-center space-y-6">
              <p className={`text-2xl md:text-3xl font-serif leading-relaxed ${
                darkMode ? 'text-orange-100' : 'text-gray-800'
              }`}>
                वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये।
                <br />
                जगतः पितरौ वन्दे पार्वतीपरमेश्वरौ॥
              </p>
              
              <div className={`h-px w-24 mx-auto ${darkMode ? 'bg-orange-700/40' : 'bg-orange-200'}`}></div>
              
              <p className={`text-base md:text-lg leading-relaxed ${
                darkMode ? 'text-orange-200/80' : 'text-gray-600'
              }`}>
                "As word and meaning are inseparable, so are we—bound by language and purpose."
              </p>
              
              <p className={`text-sm italic ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                — Kalidasa, Raghuvamsham
              </p>
            </div>

            <Quote className={`absolute bottom-6 right-6 w-10 h-10 opacity-20 rotate-180 ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            }`} />
          </div>
        </div>
      </section>

      {/* Founder's Vision */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              darkMode 
                ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' 
                : 'bg-linear-to-br from-orange-100 to-red-100'
            }`}>
              <Heart className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              संस्थापक का विचार
            </h2>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Founder's Note
            </p>
          </div>

          <div className={`p-8 md:p-12 rounded-3xl border ${
            darkMode 
              ? 'bg-orange-900/10 border-orange-800/30' 
              : 'bg-white border-orange-100 shadow-lg'
          }`}>
            <div className="space-y-6">
              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-orange-100' : 'text-gray-800'
              }`}>
                VartaLang किसी trend से नहीं निकला।<br />
                यह <span className="font-semibold">अनुभव से पैदा हुआ विचार</span> है।
              </p>

              <p className={`text-base leading-relaxed ${
                darkMode ? 'text-orange-200/80' : 'text-gray-600'
              }`}>
                भारत में रहते हुए मैंने देखा कि भाषा की समस्या अक्सर शब्दों की नहीं होती—
                वह <span className="font-semibold">आत्मविश्वास, संकोच और दूरी</span> की समस्या होती है।
                लोग समझते हैं, पर बोल नहीं पाते।
                जानते हैं, पर जुड़ नहीं पाते।
              </p>

              <p className={`text-base leading-relaxed italic ${
                darkMode ? 'text-orange-200/70' : 'text-gray-500'
              }`}>
                We turned language into either syllabus or entertainment—both paths incomplete.
              </p>

              <div className={`my-8 p-6 rounded-2xl border-l-4 ${
                darkMode 
                  ? 'bg-orange-900/20 border-orange-600' 
                  : 'bg-orange-50 border-orange-400'
              }`}>
                <p className={`text-lg font-semibold leading-relaxed ${
                  darkMode ? 'text-orange-100' : 'text-gray-800'
                }`}>
                  VartaLang इस विश्वास पर खड़ा है कि भाषा कोई skill नहीं, एक <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>सामाजिक शक्ति</span> है—
                  जो तब काम करती है जब लोग सुरक्षित महसूस करें, और जब सीखना सम्मान से जुड़ा हो।
                </p>
              </div>

              <p className={`text-base leading-relaxed ${
                darkMode ? 'text-orange-200/80' : 'text-gray-600'
              }`}>
                यह मंच मैंने एक engineer की तरह नहीं, एक <span className="font-semibold">Indian citizen</span> की तरह बनाना शुरू किया—
                जहाँ technology रास्ता बने, पर दिशा इंसानी मूल्यों से तय हो।
              </p>

              <div className={`pt-6 mt-6 border-t ${darkMode ? 'border-orange-800/30' : 'border-orange-100'}`}>
                <p className={`text-lg font-semibold mb-3 ${
                  darkMode ? 'text-orange-100' : 'text-gray-800'
                }`}>
                  VartaLang का उद्देश्य तेज़ growth नहीं, <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>सही growth</span> है।
                </p>
                <p className={`text-base ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                  अगर यहाँ लोग ठहरते हैं, तो इसलिए कि उन्हें यहाँ बोलने में डर नहीं लगता।
                </p>
              </div>

              <div className="pt-8 text-right">
                <p className={`text-lg font-semibold ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                  — Dhawal Shukla
                </p>
                <p className={`text-sm ${darkMode ? 'text-orange-200/60' : 'text-gray-500'}`}>
                  Founding Engineer, VartaLang
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cosmo India Prakashan Section */}
      <section className={`py-20 px-4 ${
        darkMode ? 'bg-linear-to-b from-transparent to-orange-900/10' : 'bg-linear-to-b from-transparent to-orange-50/50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              darkMode 
                ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' 
                : 'bg-linear-to-br from-orange-100 to-red-100'
            }`}>
              <BookOpen className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              हमारी विरासत
            </h2>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Cosmo India Prakashan Group & VartaLang
            </p>
          </div>

          <div className="space-y-8">
            <div className={`p-8 md:p-10 rounded-3xl border ${
              darkMode 
                ? 'bg-orange-900/10 border-orange-800/30' 
                : 'bg-white border-orange-100 shadow-lg'
            }`}>
              <p className={`text-lg leading-relaxed mb-6 ${
                darkMode ? 'text-orange-100' : 'text-gray-800'
              }`}>
                VartaLang, <span className="font-semibold">Cosmo India Prakashan Group</span> की एक पहल है—
                एक ऐसा प्रकाशन समूह जिसकी जड़ें भाषा, विचार और संस्कृति के साथ जुड़ी रही हैं।
              </p>

              <p className={`text-base leading-relaxed mb-6 ${
                darkMode ? 'text-orange-200/80' : 'text-gray-600'
              }`}>
                Cosmo India Prakashan का कार्य केवल किताबें प्रकाशित करना नहीं रहा।
                हमारा काम हमेशा यह रहा है कि ज्ञान को जीवित रूप में समाज तक पहुँचाया जाए—
                चाहे वह साहित्य हो, विचार हो, या भाषा।
              </p>

              <div className={`grid md:grid-cols-2 gap-6 my-8 p-6 rounded-2xl ${
                darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
              }`}>
                <div>
                  <p className={`text-base font-semibold mb-2 ${
                    darkMode ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    पहले
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    शब्द काग़ज़ पर थे
                  </p>
                </div>
                <div>
                  <p className={`text-base font-semibold mb-2 ${
                    darkMode ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    अब
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    वे संवाद में हैं
                  </p>
                </div>
                <div>
                  <p className={`text-base font-semibold mb-2 ${
                    darkMode ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    पहले
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    पाठक थे
                  </p>
                </div>
                <div>
                  <p className={`text-base font-semibold mb-2 ${
                    darkMode ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    अब
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                    भागीदार हैं
                  </p>
                </div>
              </div>

              <p className={`text-base leading-relaxed italic ${
                darkMode ? 'text-orange-200/70' : 'text-gray-500'
              }`}>
                This initiative is built on the understanding that in the digital age, 
                preserving language doesn't mean keeping it in museums—it means returning it to the people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              हमारे सिद्धांत
            </h2>
            <p className={`text-lg ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
              Our Guiding Principles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: 'ध्यान से बढ़ेगा',
                subtitle: 'Mindful Growth',
                desc: 'Not chasing numbers, but nurturing connections'
              },
              {
                icon: Shield,
                title: 'सोच-समझकर बदलेगा',
                subtitle: 'Thoughtful Evolution',
                desc: 'Every change rooted in user respect and cultural sensitivity'
              },
              {
                icon: Users,
                title: 'सम्मान को foundation मानेगा',
                subtitle: 'Respect as Foundation',
                desc: 'Not a feature, but the very foundation of everything we build'
              }
            ].map((principle, i) => (
              <div 
                key={i}
                className={`group p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-900/10 to-red-900/5 border-orange-800/30 hover:bg-orange-900/20' 
                    : 'bg-linear-to-br from-white to-orange-50 border-orange-100 hover:shadow-xl'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  darkMode 
                    ? 'bg-linear-to-br from-orange-500/20 to-red-600/20' 
                    : 'bg-linear-to-br from-orange-100 to-red-100'
                }`}>
                  <principle.icon className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {principle.title}
                </h3>
                <p className={`text-sm font-medium mb-3 ${
                  darkMode ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  {principle.subtitle}
                </p>
                <p className={`text-base leading-relaxed ${
                  darkMode ? 'text-orange-200/70' : 'text-gray-600'
                }`}>
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className={`relative p-12 rounded-3xl border overflow-hidden ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/10 border-orange-800/30' 
              : 'bg-linear-to-br from-orange-50 to-red-50 border-orange-200'
          }`}>
            {/* Decorative Elements */}
            <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl ${
              darkMode ? 'bg-orange-600/10' : 'bg-orange-300/20'
            }`}></div>
            <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl ${
              darkMode ? 'bg-red-600/10' : 'bg-red-300/20'
            }`}></div>

            <div className="relative z-10 text-center space-y-6">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-500/30 to-red-600/30' 
                  : 'bg-linear-to-br from-orange-200 to-red-200'
              }`}>
                <Sparkles className={`w-7 h-7 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>

              <h3 className={`text-2xl md:text-3xl font-bold ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                VartaLang — एक सार्वजनिक डिजिटल संपत्ति
              </h3>

              <p className={`text-lg leading-relaxed ${
                darkMode ? 'text-orange-100' : 'text-gray-800'
              }`}>
                हम मानते हैं कि भाषा के साथ काम करना एक तकनीकी चुनौती नहीं, 
                <span className="font-semibold"> नैतिक ज़िम्मेदारी</span> है।
              </p>

              <p className={`text-base italic ${
                darkMode ? 'text-orange-200/70' : 'text-gray-600'
              }`}>
                We see VartaLang not as a product, but as a public digital asset—
                evolving with India's linguistic needs over time.
              </p>

              <div className={`pt-6 mt-6 border-t ${darkMode ? 'border-orange-700/40' : 'border-orange-200'}`}>
                <p className={`text-xl font-semibold ${
                  darkMode ? 'text-orange-300' : 'text-orange-700'
                }`}>
                  यह मंच तेज़ नहीं होगा—पर गहरा होगा।
                </p>
                <p className={`text-lg mt-2 ${
                  darkMode ? 'text-orange-200/80' : 'text-gray-600'
                }`}>
                  और यही इसकी शक्ति होगी।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Shloka */}
      <section className={`py-16 px-4 border-t ${darkMode ? 'border-orange-900/30' : 'border-orange-100'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className={`p-10 rounded-3xl ${
            darkMode 
              ? 'bg-linear-to-br from-orange-900/20 to-red-900/10' 
              : 'bg-linear-to-br from-orange-50 to-red-50'
          }`}>
            <p className={`text-2xl md:text-3xl font-serif leading-relaxed mb-6 ${
              darkMode ? 'text-orange-100' : 'text-gray-800'
            }`}>
              सहनाववतु। सहनौ भुनक्तु।
              <br />
              सह वीर्यं करवावहै।
            </p>
            
            <div className={`h-px w-24 mx-auto mb-6 ${darkMode ? 'bg-orange-700/40' : 'bg-orange-200'}`}></div>
            
            <p className={`text-lg leading-relaxed ${
              darkMode ? 'text-orange-200/80' : 'text-gray-600'
            }`}>
              "May we be protected together, may we be nourished together,
              <br />
              may we work together with great energy."
            </p>
            
            <p className={`text-sm italic mt-4 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
              — Taittiriya Upanishad
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-20 px-4 ${
        darkMode ? 'bg-linear-to-b from-transparent to-orange-900/10' : 'bg-linear-to-b from-transparent to-orange-50'
      }`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-orange-50' : 'text-gray-900'
          }`}>
            Join our journey
          </h2>
          <p className={`text-lg mb-8 ${
            darkMode ? 'text-orange-200/80' : 'text-gray-600'
          }`}>
            आइए, भाषा के पुल बनाएं — सम्मान के साथ।
          </p>
          <a
            href="/auth/signup"
            className={`inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base
            bg-linear-to-r from-orange-500 to-red-600 text-white
            hover:shadow-xl hover:scale-105 transition-all`}
          >
            Start Connecting
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}