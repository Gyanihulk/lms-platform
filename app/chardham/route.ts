import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { bot, sendMessage } from "@/lib/telegram";
interface Hotel {
  _type: string;
  _createdAt: string;
  name: string;
  title: string;
  city: string;
  _updatedAt: string;
  _id: string;
  _rev: string;
}

export async function POST(req: Request) {
  try {
    const bodyString: string = await req.text();
const body: Hotel = JSON.parse(bodyString);

  let message = "Received a new update.";
  // Customize the message based on the _type field in the JSON payload
  switch (body._type) {
    case "hotel":
      message = `New hotel created: ${body.name} in ${body.city}. Title: ${body.title}`;
      break;
    // Add more cases as needed for different _type values
    default:
      message = "Received an update for an unknown type.";
  }

  // Send the customized message
  await sendMessage(message, -4117976729);
  } catch (err) {
    console.log(err);
  }

  return new NextResponse(null, { status: 200 });
}
