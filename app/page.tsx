/*
 * @Author: zuo
 * @Date: 2026-02-26 19:57:30
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 animate-fadeIn">Live Stream Platform</h1>
        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
          欢迎来到直播平台，选择您的角色开始体验
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 max-w-md w-full">
        <a href="/host" className="w-full">
          <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            我是主播
          </button>
        </a>

        <a href="/viewer" className="w-full">
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            我是观众
          </button>
        </a>
      </div>

      <div className="mt-16 text-indigo-200 text-sm">
        © 2026 Live Stream Platform
      </div>
    </div>
  );
}