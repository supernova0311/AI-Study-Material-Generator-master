import React from "react";
import { ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          <span className="text-xl md:text-2xl font-bold">Study Genie</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <a
            href="https://github.com/Adiaparmar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 md:px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg border border-gray-200 flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
          >
            <Github className="w-4 h-4 md:w-5 md:h-5" />
            <span>GitHub</span>
          </a>
          <Link href="/dashboard">
            <button className="px-3 md:px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-sm md:text-base">
              Dashboard
            </button>
          </Link>
        </div>
      </nav>

      {/* New Badge Banner */}
      <div className="flex justify-center mt-6 md:mt-8 px-4">
        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
          <span className="px-2 py-1 text-xs text-white bg-blue-600 rounded-full">
            New
          </span>
          <span className="text-sm">Adiaparmar : AI-Powered Exam Prep</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 mt-8 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Icon */}
          <div className="hidden md:flex md:col-span-3 justify-end">
            <div className="relative transform -rotate-12">
              <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex space-x-1">
                    <div className="w-4 h-12 bg-yellow-400 rounded"></div>
                    <div className="w-4 h-8 bg-yellow-400 rounded"></div>
                    <div className="w-4 h-10 bg-yellow-400 rounded"></div>
                  </div>
                  <div className="w-4 h-4 bg-red-500 rounded-full mt-2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="md:col-span-6 text-center">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
                <div className="flex flex-wrap justify-center whitespace-normal md:whitespace-nowrap">
                  <span className="text-black">AI-Powered </span>
                  <span className="text-blue-600">Exam Prep</span>
                </div>
                <div className="mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Material Generator
                </div>
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-xl px-4">
                Your AI Exam Prep Companion: Effortless Study Material at Your
                Fingertips
              </p>
              <div className="flex justify-center mt-6 md:mt-8">
                <Link href="/dashboard">
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 font-semibold text-base md:text-xl">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Icon */}
          <div className="hidden md:flex md:col-span-3 justify-start">
            <div className="transform rotate-12">
              <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-3xl md:text-4xl font-mono text-blue-600">
                  {"</>"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 md:py-6 text-gray-600 text-sm md:text-base">
        Made with ❤️ by Aditya Kumar Singh
      </footer>
    </div>
  );
};

export default LandingPage;
