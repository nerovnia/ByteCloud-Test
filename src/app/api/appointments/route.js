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



/* 
import { NextResponse } from "next/server";

//const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const DATA_SOURCE_URL = "/";
const API_KEY = process.env.API_KEY;


export async function GET() {
  const res = await fetch(DATA_SOURCE_URL)
  const all = await res.json();

  return NextResponse.json(all);
}

export async function DELETE(request) {
  const {id} = await request.json();

  if (!id) return NextResponse.json({'message': "All id are required"});

  //await fetch(`${DATA_SOURCE_URL}/${id}`, {
  await fetch(`${DATA_SOURCE_URL}/api/delete/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json',
      'API-Key': API_KEY
    }
  })

  //return NextResponse.json({"message": `Todo ${id} deleted successfully`})
  return {"message": `Todo ${id} deleted successfully`}
}
*/