import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const API_URL = "https://meme-api.com/gimme/20";


  try {
    const response = await axios.get(`${API_URL}`);

    if (!response.data) {
      return NextResponse.json(
        {
          message: "Error fetching meme from humor api...!",
        },
        { status: 500 }
      );
    }

    const data = await response.data;

    return NextResponse.json(
      {
        message: "Memes fetched successfully...!",
        meme: data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error while fetching memes",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
