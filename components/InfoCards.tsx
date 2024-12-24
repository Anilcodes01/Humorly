"use client";
import { Zap, Library, Users, Target, Trophy, Smile } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function InfoCards() {
  const cards = [
    {
      icon: <Zap size={28} className="text-yellow-400" />,
      title: "Humor Challenges",
      description: "Flex your funny bone with daily Challenges💪",
    },
    {
      icon: <Library size={28} className="text-green-500" />,
      title: "Laugh Library",
      description: "Curated collections of jokes and memes📚😂",
    },
    {
      icon: <Users size={28} className="text-blue-500" />,
      title: "Social Interactions",
      description: "Share your humor creations with the community🤝",
    },
    {
      icon: <Target size={28} className="text-red-500" />,
      title: "Roast Me",
      description: "Opt in for some hilarious roasting 🔥",
    },
    {
      icon: <Trophy size={28} className="text-amber-500" />,
      title: "Leaderboards",
      description: "Compete to be the funniest user of the day/week🏆",
    },
    {
      icon: <Smile size={28} className="text-pink-500" />,
      title: "Mood Booster",
      description: "Uplift your spirits with mood-enhancing humor😊",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="grid gap-4 md:gap-6 px-4 md:px-6 lg:px-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="bg-white p-4 md:p-6 shadow-md rounded-lg flex flex-col items-center justify-center text-center h-full"
        >
          <div className="mb-3">{card.icon}</div>
          <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-2">
            {card.title}
          </h3>
          <p className="text-purple-600 text-sm md:text-base">
            {card.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
