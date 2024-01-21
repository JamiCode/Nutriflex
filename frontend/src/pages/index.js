// pages/index.js
import React from "react";
import Head from "next/head";
import "../app/globals.css";
import "../components/NavBar";
import NavBar from "../components/NavBar";

const LandingPage = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen font-sans">
      <Head>
        <title>NutriFlex - Your Ultimate Fitness Companion</title>
      </Head>

      <NavBar />
      {/* Hero Section with more margin and padding */}
      <div className="container mx-auto text-center py-40">
        <h1 className="text-5xl font-extrabold mb-4 typewriter">
          NutriFlex: Personal AI Assistant
        </h1>
        <p className="text-lg mb-8">
          Your ultimate fitness companion powered by artificial intelligence!
        </p>
        <a
          href="/auth/register"
          className="bg-[#525CEB] text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
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
              description="Tailored fitness exercises based on individual fitness levels, preferences, and goals."
            />
            <FeatureCard
              title="Weekly Fitness Task Generator"
              description="Automatically generates a personalized set of fitness tasks for each week, enhancing your website with dynamic and engaging weekly workout plans."
            />
            <FeatureCard
              title="AI-Powered Encouragement"
              description="Receive personalized and motivational messages from our AI assistant to keep you motivated."
            />
          </div>
        </div>
      </div>

      {/* Problem Statement, Solution, and Contact Sections */}
      <div
        className="container mx-auto flex flex-wrap justify-center gap-8 py-8"
        id="idea"
      >
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

        <div id="about">
          <SectionCard title="About Us">
            <p>
              Our website was created as a submission for the lablab.ai NextGen
              GPT AI Hackathon.
              <a href="https://github.com/JamiCode/Nutriflex"> GitHub </a>
            </p>
          </SectionCard>
        </div>
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
