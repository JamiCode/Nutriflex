# Nutri Flex - Your Personalized AI Fitness Assistant
[![Python application](https://github.com/Tech-With-Tim/twtcodejam.net/workflows/Python%20application/badge.svg?branch=master)](https://github.com/Tech-With-Tim/twtcodejam.net/actions)
[![Line count](https://img.shields.io/tokei/lines/github/Tech-With-TIm/twtcodejam.net)](https://github.com/Tech-With-Tim/twtcodejam.net)
[![Open issues](https://img.shields.io/github/issues/Tech-With-Tim/twtcodejam.net)](https://github.com/Tech-With-Tim/twtcodejam.net/issues)
[![License](https://img.shields.io/github/license/Tech-With-Tim/twtcodejam.net?color=brightgreen)](https://github.com/Tech-With-Tim/twtcodejam.net/blob/master/LICENSE)
[![Discord server](https://img.shields.io/discord/501090983539245061.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/twt)

## Overview

#### Current Status: Completed

Welcome to Nutri Flex, your ultimate fitness companion powered by artificial intelligence! This application aims to revolutionize the fitness experience by providing personalized workout plans, real-time progress analysis, and AI-powered encouragement to keep you motivated on your journey to optimal health.

## Problem Statement

Fitness enthusiasts often face challenges with generic workout routines, limited feedback, and a lack of interactivity in existing fitness apps. This leads to frustration and eventually abandonment of fitness goals.

## Solution

Nutri Flex addresses these challenges by leveraging cutting-edge AI technology to deliver a dynamic and engaging fitness experience. With personalized guidance, real-time progress tracking, and interactive AI encouragement, Nutri Flex is designed to keep users motivated and committed to their long-term health goals.

## Key Features

- **Personalized Workout Plans:** Tailored exercises based on individual fitness levels, preferences, and goals.
- **Real-time Progress Analysis:** Track your progress and receive insights to optimize your fitness journey.
- **AI-Powered Encouragement:** Receive personalized and motivational messages from our AI assistant to keep you motivated.

## Technology Stack

Nutri Flex utilizes a powerful combination of technologies to deliver a seamless and interactive experience:

- **Django:** A high-level Python web framework for building robust and scalable backend systems.
- **React:** A popular JavaScript library for building user interfaces, ensuring a smooth and responsive frontend.
- **Clarifai AI:** Integration of Clarifai's AI capabilities for image and video recognition, enhancing the app's features.

## How Clarifai AI Integration Works

Nutri Flex integrates Clarifai AI to enhance its capabilities, particularly in image recognition for workout form assessment and video analysis for personalized feedback. The AI ensures accuracy in exercise execution and provides valuable insights to improve your performance.

## Make migrations

`python3 ./backend/nutriflex_api/manage.py makemigrations`

`python3 ./backend/nutriflex_api/manage.py migrate`

`python3 ./backend/nutriflex_api/manage.py createsuperuser`
