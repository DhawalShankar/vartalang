import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-indigo-950">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-16 px-6 sm:px-12">
        
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600">
              <span className="text-xl font-bold text-white">V</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">VartaLang</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Coming Soon
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center gap-8 text-center mt-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
            Launching Soon
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Learn Languages by
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Talking to Real People</span>
          </h1>

          <p className="max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            VartaLang connects you with native speakers for authentic language exchange. 
            No bots. No games. Just real conversations that help you actually learn.
          </p>

          

          
        </div>

        {/* Features Grid */}
        <div className="grid w-full gap-6 sm:grid-cols-3 mt-16">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white/50 p-6 text-center backdrop-blur dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Real Conversations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Match with native speakers who want to learn your language
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white/50 p-6 text-center backdrop-blur dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Smart Matching</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Find partners based on your goals, interests, and availability
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white/50 p-6 text-center backdrop-blur dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Learn & Earn</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Teach your native language and create courses for learners
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex w-full flex-col items-center gap-4 border-t border-gray-200 pt-8 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
          <p>Built with ❤️ for language learners worldwide</p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/vartalang/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Instagram</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Whatsapp</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Twitter</a>
          </div>
        </div>
      </main>
    </div>
  );
}