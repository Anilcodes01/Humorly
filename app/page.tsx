import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Smile, MessageCircle , Flame } from "lucide-react";
import Link from "next/link";

export default async function App() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <script>{`window.location.href = '/info'`}</script>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Punchline Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <MessageCircle  className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-xl">Finish the Punchline 👊</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xl font-medium">Why did the tomato turn red?...</p>
              <p className="text-gray-600">Create your own hilarious endings!</p>
              <div className="w-full h-0.5 bg-gray-100" />
            </CardContent>
            <CardFooter>
              <Link href="/guessThePunchline">
                <button className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors">
                  Start the challenge →
                </button>
              </Link>
            </CardFooter>
          </Card>

          {/* Memes Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Smile className="w-5 h-5 text-green-500" />
                <CardTitle className="text-xl">Meme Central 🎭</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xl font-medium">Daily dose of laughter!</p>
              <p className="text-gray-600">Browse and share the dankest memes</p>
              <div className="w-full h-0.5 bg-gray-100" />
            </CardContent>
            <CardFooter>
              <Link href="/memes">
                <button className="text-sm text-green-500 hover:text-green-700 hover:underline transition-colors">
                  View memes →
                </button>
              </Link>
            </CardFooter>
          </Card>

          {/* Roast Me Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <CardTitle className="text-xl">Roast Me 🔥</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xl font-medium">Ready for some heat?</p>
              <p className="text-gray-600">Share and receive friendly roasts</p>
              <div className="w-full h-0.5 bg-gray-100" />
            </CardContent>
            <CardFooter>
              <Link href="/roastme">
                <button className="text-sm text-orange-500 hover:text-orange-700 hover:underline transition-colors">
                  Get roasted →
                </button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}