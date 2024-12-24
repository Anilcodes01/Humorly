"use client";
import InfoCards from "@/components/InfoCards";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Award,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-pink-100 min-h-screen">
      <motion.div
        initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0.5px)" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center px-4 pt-20 lg:pt-24"
      >
        <h1 className="text-center text-purple-900 mt-4 md:mt-8 text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl">
          Connect, Create, and Crack Up🤣
        </h1>

        <p className="text-center text-lg md:text-xl text-purple-700 mt-4 md:mt-6 mb-6 md:mb-8 max-w-2xl">
          Because smile is contagious—Your daily dose of laughter and humor!
        </p>

        <Button className=" sm:w-auto px-8 bg-purple-600 hover:bg-purple-700" size="lg">
          Get Started
        </Button>
      </motion.div>

      <div className="mt-8 md:mt-12">
        <InfoCards />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="p-4 md:p-6 mt-8 md:mt-12 mb-8 md:mb-12 flex flex-col items-center justify-center"
      >
        <p className="text-3xl md:text-4xl mb-6 md:mb-8 text-purple-900 font-bold text-center">
          Daily Humor Dose
        </p>
        <p className="text-purple-600 mb-4 text-lg md:text-xl text-center">
          Today's Prompt: "Describe your Monday using only emojis"
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-3xl md:text-4xl"
        >
          😴☕😫💻🙃🕓🏃‍♂️🍕😅
        </motion.div>
        <Button variant="outline" className="mt-6 hover:bg-purple-100">
          Share Your Response
        </Button>
      </motion.div>

      <div className="mx-4 md:mx-6 lg:mx-16 mb-12 rounded-lg shadow-xl bg-white">
        <div className="p-4 md:p-6">
          <h2 className="text-purple-900 font-bold mb-6 text-2xl md:text-3xl text-center">
            Achievements Unlocked 🏆
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                bgColor: "bg-yellow-200",
                iconColor: "text-yellow-500",
                title: "Novice Jester",
                description: "First 10 laughs earned",
              },
              {
                bgColor: "bg-blue-200",
                iconColor: "text-blue-500",
                title: "Meme Master",
                description: "Created 50 original memes",
              },
              {
                bgColor: "bg-green-200",
                iconColor: "text-green-500",
                title: "Pun-tastic",
                description: "Shared 100 puns",
              },
              {
                bgColor: "bg-red-200",
                iconColor: "text-red-500",
                title: "Roast Champion",
                description: "Survived 25 roasts",
              },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`${achievement.bgColor} rounded-lg p-4 flex flex-col items-center text-center justify-center`}
              >
                <Award size={40} className={achievement.iconColor} />
                <span className="text-purple-800 font-bold text-lg md:text-xl mt-2">
                  {achievement.title}
                </span>
                <p className="text-purple-600 text-sm md:text-base mt-1">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0.5px)' }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-purple-800 py-6 px-4 mt-12"
      >
        <div className="text-center text-white text-sm md:text-base">
          © 2024 Humorly. All rights reserved.
        </div>
        <div className="flex gap-4 md:gap-6 text-white/50 justify-center mt-4">
          <button className="hover:text-white text-sm md:text-base transition-colors">
            Terms
          </button>
          <button className="hover:text-white text-sm md:text-base transition-colors">
            Privacy
          </button>
          <button className="hover:text-white text-sm md:text-base transition-colors">
            Contact
          </button>
        </div>
      </motion.footer>
    </div>
  );
}