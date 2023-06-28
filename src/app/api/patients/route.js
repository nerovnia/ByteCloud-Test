import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = req.json();
    return NextResponse.json( { 
      body: {
      message: "Message sent successfully!" 
    }},{ int: {
      status: 200
    }})
  } catch (e) {
    return NextResponse.json({
      body: {
        message: "Server error, please try again!"
      }},
      {int: { status: 500 }}
    )
  }
}