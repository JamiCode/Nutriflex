// pages/index.js
import React from "react";
import Head from "next/head";
import "../app/globals.css";

const LandingPage = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen font-sans">
      <Head>
        <title>NutriFlex - Your Ultimate Fitness Companion</title>
      </Head>

      {/* Navigation Bar with a place for a logo */}
      <nav className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="NutriFlex Logo"
            className="w-10 h-10 mr-2"
          />
          <div className="text-2xl font-extrabold">NutriFlex</div>
        </div>
        <div className="flex space-x-4">
          <a href="#home" className="text-lg hover:underline">
            Home
          </a>
          <a href="#features" className="text-lg hover:underline">
            Features
          </a>
          <a href="#problem" className="text-lg hover:underline">
            Problem
          </a>
          <a href="#solution" className="text-lg hover:underline">
            Solution
          </a>
          <a href="#contact" className="text-lg hover:underline">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section with more margin and padding */}
      <div className="container mx-auto text-center py-40">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Nutri Flex</h1>
        <p className="text-lg mb-8">
          Your ultimate fitness companion powered by artificial intelligence!
        </p>
        <a
          href="#"
          className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </a>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-800 py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <FeatureCard
              title="Personalized Workout Plans"
              description="Tailored exercises based on individual fitness levels, preferences, and goals."
            />
            <FeatureCard
              title="Real-time Progress Analysis"
              description="Track your progress and receive insights to optimize your fitness journey."
            />
            <FeatureCard
              title="AI-Powered Encouragement"
              description="Receive personalized and motivational messages from our AI assistant to keep you motivated."
            />
          </div>
        </div>
      </div>

      {/* Problem Statement, Solution, and Contact Sections */}
      <div className="container mx-auto flex flex-wrap justify-center gap-8 py-8">
        {/* Problem Statement Section */}
        <SectionCard title="Problem Statement">
          <p>
            Fitness enthusiasts often face challenges with generic workout
            routines, limited feedback, and a lack of interactivity in existing
            fitness apps. This leads to frustration and eventually abandonment
            of fitness goals.
          </p>
        </SectionCard>

        {/* Solution Section */}
        <SectionCard title="Solution">
          <p>
            Nutri Flex addresses these challenges by leveraging cutting-edge AI
            technology to deliver a dynamic and engaging fitness experience.
            With personalized guidance, real-time progress tracking, and
            interactive AI encouragement, Nutri Flex is designed to keep users
            motivated and committed to their long-term health goals.
          </p>
        </SectionCard>

        {/* Contact Section */}
        <SectionCard title="Contact Us">
          <p>
            For any inquiries or support, please email us at{" "}
            <a href="mailto:info@nutriflex.com">info@nutriflex.com</a>.
          </p>
        </SectionCard>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description }) => {
  return (
    <div className="max-w-sm bg-gray-700 p-6 rounded-md shadow-lg">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

// Section Card Component
const SectionCard = ({ title, children }) => {
  return (
    <div className="max-w-md bg-gray-700 p-6 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default LandingPage;
