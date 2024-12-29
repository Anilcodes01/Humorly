"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks/redux";
import { fetchMemes } from "../app/store/features/memeSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefreshCw, ThumbsUp, ExternalLink, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MemeGrid() {
  const dispatch = useAppDispatch();
  const { memes, loading, error } = useAppSelector((state) => state.meme);
  const [selectedMeme, setSelectedMeme] = useState<null | { title: string; url: string; ups: number; subreddit: string; postLink: string }>(null);

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchMemes());
  };

  const handleMemeClick = (meme: any) => {
    setSelectedMeme(meme);
  };

  if (error) {
    return (
      <div className="min-h-screen p-4 mt-20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold"> Memes</h1>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-lg shadow-sm h-[300px]">
                    <div className="h-full bg-gray-200 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memes.map((meme) => (
                <Card
                  key={meme.postLink}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleMemeClick(meme)}
                >
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-lg line-clamp-2">
                      {meme.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={meme.url}
                        alt={meme.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ThumbsUp className="w-4 h-4" />
                      {meme.ups}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        r/{meme.subreddit}
                      </span>
                      <a
                        href={meme.postLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={selectedMeme !== null}
        onOpenChange={() => setSelectedMeme(null)}
      >
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {selectedMeme && (
            <>
              <DialogHeader>
                <DialogTitle className="pr-8">{selectedMeme.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={selectedMeme.url}
                  alt={selectedMeme.title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{selectedMeme.ups} upvotes</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>r/{selectedMeme.subreddit}</span>
                    <a
                      href={selectedMeme.postLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View on Reddit <ExternalLink className="w-4 h-4 inline" />
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
