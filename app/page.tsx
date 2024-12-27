import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function App() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <script>{`window.location.href = '/info'`}</script>;
  }

  return (
    <div className="min-h-screen flex gap-4 items-center justify-center text-black">
      <Card>
        <CardHeader>
          <CardTitle>Finish the punchline 👊</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-2 ">Why did the tomato turn red?...</p>
          <p className="text-gray-600">Enter your punchline</p>
          <hr className="" />
        </CardContent>
        <CardFooter>
          <Link href="/guessThePunchline">
            <button className="text-sm hover:underline text-blue-500">
              Complete challenges..!
            </button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
