"use client";

import { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import ResultCard from "./ResultCard";

type Personality = "Bold Adventurer" | "Sweet Enthusiast" | "Artisan Snob" | "Indulgent Treat";

interface Answer {
  text: string;
  icon: string;
  personality: Personality;
}

interface Question {
  question: string;
  answers: Answer[];
}

const personalities: Record<Personality, { coffee: string; tagline: string; description: string }> = {
  "Bold Adventurer": {
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    description: "You're fearless, energetic, and never back down from a challenge. Your coffee matches your spirit — bold, direct, no nonsense.",
  },
  "Sweet Enthusiast": {
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    description: "You bring warmth and sweetness to everything you do. You appreciate the finer, cozier things in life — and your coffee should too.",
  },
  "Artisan Snob": {
    coffee: "Pour-Over, Single Origin",
    tagline: "You know what you like",
    description: "You have standards and you own it. You're curious, discerning, and passionate about quality. Your coffee has a story — and so do you.",
  },
  "Indulgent Treat": {
    coffee: "Mocha with Whip",
    tagline: "Coffee is dessert",
    description: "You know how to treat yourself and you're not apologizing for it. Life is better with a little indulgence, and you've mastered that art.",
  },
};

const questions: Question[] = [
  {
    question: "Your perfect Saturday morning looks like...",
    answers: [
      { icon: "🏃", text: "Up early, out the door — adventure awaits", personality: "Bold Adventurer" },
      { icon: "🛁", text: "Slow start, something sweet, total comfort", personality: "Indulgent Treat" },
      { icon: "📰", text: "Coffee first, then reading something interesting", personality: "Artisan Snob" },
      { icon: "🥐", text: "Pastries, good music, no rush", personality: "Sweet Enthusiast" },
    ],
  },
  {
    question: "When you travel, you tend to...",
    answers: [
      { icon: "🎒", text: "Pack light and figure it out as you go", personality: "Bold Adventurer" },
      { icon: "🗺️", text: "Research every café and restaurant in advance", personality: "Artisan Snob" },
      { icon: "🏖️", text: "Go somewhere beautiful and just... relax", personality: "Sweet Enthusiast" },
      { icon: "🛎️", text: "Stay somewhere with great room service", personality: "Indulgent Treat" },
    ],
  },
  {
    question: "Your ideal dinner is...",
    answers: [
      { icon: "🔥", text: "Something bold and spicy — the hotter, the better", personality: "Bold Adventurer" },
      { icon: "🍝", text: "A classic comfort dish, made really well", personality: "Sweet Enthusiast" },
      { icon: "👨‍🍳", text: "A tasting menu at a place with a story behind it", personality: "Artisan Snob" },
      { icon: "🍰", text: "Whatever ends with a great dessert", personality: "Indulgent Treat" },
    ],
  },
  {
    question: "Your friends would describe you as...",
    answers: [
      { icon: "⚡", text: "Always up for anything, never slows down", personality: "Bold Adventurer" },
      { icon: "🌸", text: "Sweet, warm, makes everyone feel welcome", personality: "Sweet Enthusiast" },
      { icon: "🎯", text: "Opinionated, passionate, knows what they like", personality: "Artisan Snob" },
      { icon: "😌", text: "The one who always knows where to find the best food", personality: "Indulgent Treat" },
    ],
  },
  {
    question: "Your relationship with your phone is...",
    answers: [
      { icon: "📵", text: "Off on weekends — I'm present", personality: "Bold Adventurer" },
      { icon: "📸", text: "Always ready for a good food photo", personality: "Sweet Enthusiast" },
      { icon: "🔍", text: "Used mainly to deep-dive into topics I care about", personality: "Artisan Snob" },
      { icon: "💬", text: "Netflix, delivery apps, and group chats", personality: "Indulgent Treat" },
    ],
  },
];

const tieBreakOrder: Personality[] = ["Bold Adventurer", "Sweet Enthusiast", "Artisan Snob", "Indulgent Treat"];

function calculateResult(answers: Personality[]): Personality {
  const counts: Record<Personality, number> = {
    "Bold Adventurer": 0,
    "Sweet Enthusiast": 0,
    "Artisan Snob": 0,
    "Indulgent Treat": 0,
  };
  for (const p of answers) counts[p]++;
  const max = Math.max(...Object.values(counts));
  return tieBreakOrder.find((p) => counts[p] === max)!;
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Personality[]>([]);
  const [result, setResult] = useState<Personality | null>(null);

  function handleAnswer(personality: string) {
    const p = personality as Personality;
    const newAnswers = [...answers, p];
    if (currentQuestion + 1 >= questions.length) {
      setAnswers(newAnswers);
      setResult(calculateResult(newAnswers));
    } else {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handleRetake() {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  }

  if (result) {
    return (
      <ResultCard
        personality={result}
        coffee={personalities[result].coffee}
        tagline={personalities[result].tagline}
        description={personalities[result].description}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <QuizQuestion
      question={questions[currentQuestion].question}
      answers={questions[currentQuestion].answers}
      currentIndex={currentQuestion}
      total={questions.length}
      onAnswer={handleAnswer}
    />
  );
}
