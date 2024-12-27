'use client'
import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import { fetchJoke, submitPunchline, resetState, setUserPunchline, setError } from "../store/features/jokesSlice";
import type { RootState } from "../store/store";

export default function GuessThePunchlinePage() {
  const dispatch: AppDispatch = useDispatch();

  const {
    joke,
    userPunchline,
    realPunchline,
    feedback,
    isLoading,
    showRealPunchline,
    error,
  } = useSelector((state: RootState) => state.jokes);

  useEffect(() => {
    dispatch(fetchJoke());
  }, [dispatch]);

  const handleUserPunchlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserPunchline(e.target.value));
  };

  const handleSubmit = async () => {
    if (!userPunchline.trim()) {
      dispatch(setError("Please enter a punchline"));
      return;
    }

    dispatch(
      submitPunchline({
        joke,
        userPunchline,
        punchline: realPunchline,
      })
    );
  };

  const handleNewJoke = () => {
    dispatch(resetState());
    dispatch(fetchJoke());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br md:mt-12 mt-4 from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-3 md:px-4 py-16">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-4 md:p-8">
            <div className="flex items-center justify-center gap-2 mb-12">
              <Sparkles className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-800">Joke Time</h1>
            </div>

            <div className="space-y-8">
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-medium text-gray-700">Setup</h2>
                </div>
                <p className="text-lg text-gray-800">
                  {joke || "Loading joke..."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Your witty punchline goes here..."
                    value={userPunchline}
                    onChange={handleUserPunchlineChange}
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

              {showRealPunchline && (
                <div className="space-y-4 animate-fadeIn">
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
                          Gemini&apos;s Take
                        </h2>
                      </div>
                      <p className="text-lg text-gray-800">{feedback}</p>
                    </div>
                  )}
                </div>
              )}

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
