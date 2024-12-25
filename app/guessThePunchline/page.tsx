"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Send,
  RefreshCw,
  MessageSquare,
  ThumbsUp,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function GuessThePunchlinePage() {
  const [joke, setJoke] = useState("");
  const [userPunchline, setUserPunchline] = useState("");
  const [realPunchline, setRealPunchline] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRealPunchline, setShowRealPunchline] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await axios.get(
          "https://official-joke-api.appspot.com/random_joke"
        );
        setJoke(response.data.setup);
        setRealPunchline(response.data.punchline);
        setShowRealPunchline(false);
        setUserPunchline("");
        setFeedback("");
      } catch (error) {
        setError("Failed to fetch joke...!");
      }
    };
    fetchJoke();
  }, []);

  const handleSubmit = async () => {
    if (!userPunchline.trim()) {
      setError("Please enter a punchline");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/jokes/guessThePunchline", {
        joke,
        userPunchline,
        punchline: realPunchline,
      });
      setFeedback(response.data.feedback);
      setShowRealPunchline(true);
    } catch (error) {
      setError("Failed to get feedback");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewJoke = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );
      setJoke(response.data.setup);
      setRealPunchline(response.data.punchline);
      setShowRealPunchline(false);
      setUserPunchline("");
      setFeedback("");
      setError("");
    } catch (error) {
      setError("Failed to fetch new joke");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-12 from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-2 mb-12">
              <Sparkles className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-800">Joke Time</h1>
            </div>

            <div className="space-y-8">
              {/* Joke Display */}
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-medium text-gray-700">Setup</h2>
                </div>
                <p className="text-lg text-gray-800">
                  {joke || "Loading joke..."}
                </p>
              </div>

              {/* Input Section */}
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Your witty punchline goes here..."
                    value={userPunchline}
                    onChange={(e) => setUserPunchline(e.target.value)}
                    className="w-full text-lg pl-4 pr-12 py-3 rounded-xl"
                    disabled={showRealPunchline}
                  />
                  <MessageSquare className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || showRealPunchline}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Getting Feedback...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleNewJoke}
                    disabled={isLoading}
                    className="bg-green-500 hover:bg-green-600 text-white py-6 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    New
                  </Button>
                </div>
              </div>

              {/* Results Section */}
              {showRealPunchline && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-5 h-5 text-blue-500" />
                      <h2 className="text-lg font-medium text-gray-700">
                        Your Punchline
                      </h2>
                    </div>
                    <p className="text-lg text-gray-800">{userPunchline}</p>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsUp className="w-5 h-5 text-green-500" />
                      <h2 className="text-lg font-medium text-gray-700">
                        Actual Punchline
                      </h2>
                    </div>
                    <p className="text-lg text-gray-800">{realPunchline}</p>
                  </div>

                  {feedback && (
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                        <h2 className="text-lg font-medium text-gray-700">
                          Gemini's Take
                        </h2>
                      </div>
                      <p className="text-lg text-gray-800">{feedback}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="flex items-center justify-center gap-2 text-red-500 mt-4">
                  <AlertCircle className="w-5 h-5" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
