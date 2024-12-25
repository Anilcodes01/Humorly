import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/app/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function GET() {
  try {
    const jokeResponse = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );

    const joke = jokeResponse.data.setup;

    return NextResponse.json({
      joke,
    });
  } catch (error) {
    console.error("Error fetching the joke:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { joke, userPunchline, punchline } = body;

    if (!joke || !userPunchline) {
      return NextResponse.json(
        {
          message: "Joke and userPunchline are required",
        },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `Here's a joke ${joke} and this is my puchline: ${userPunchline}`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Tell me how is the puchline according to the joke and answer in short (min-100 characters) and humourous way with emojis.",
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessageStream(
      "Answer in short (min-100 characters) and humourous way and with emojis also"
    );

    let feedback = "";
    for await (const chunk of result.stream) {
      feedback += chunk.text();
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const userJokes = await prisma.joke.create({
      data: {
        joke: joke,
        punchLine: userPunchline,
        userId: user.id,
      },
    });

    return NextResponse.json({
      joke,
      userPunchline,
      punchline,
      feedback,
    });
  } catch (error) {
    console.error("Error in API route");
    return NextResponse.json(
      {
        message: "Something went wrong",
        error,
      },
      { status: 500 }
    );
  }
}
