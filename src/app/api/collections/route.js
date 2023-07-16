import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { Patient, Doctor } from "@/models/Person";
import Appointment from "@/models/Appointment";


export async function GET(req, res) {
  try {
    await dbConnect();

    let result = await Appointment.find({});

    return NextResponse.json(
      {
        body: {
          data: result,
          message: "OK",
        },
      },
      { int: { status: 200 } }
    );
  } catch (e) {
    return NextResponse.json(
      {
        body: {
          message: `Server error, please try again! ${e}`,
        },
      },
      { int: { status: 500 } }
    );
  }
}

async function insertArrToCollection(model, arr) {
  await model.collection.insertMany(arr)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
}


export async function POST(req, res) {
  try {
    const connection = await dbConnect();
    const reestrDocuments = JSON.parse(await readStreamJSON(req.body));
    const patients = reestrDocuments.patients;
    const doctors = reestrDocuments.doctors;
    const appointments = reestrDocuments.appointments;

    await insertArrToCollection(Patient, patients);
    await insertArrToCollection(Doctor, doctors);
    await insertArrToCollection(Appointment, appointments);
    
    return NextResponse.json(
      {
        body: {
          message: "Message sent successfully!",
        },
      },
      { int: { status: 200 } }
    );
  } catch (e) {
    return NextResponse.json(
      {
        body: {
          message: `Server error, please try again! ${e}`,
        },
      },
      { int: { status: 500 } }
    );
  }
}

export async function DELETE(req, res) {
  try {
    const connection = await dbConnect();
    const result = {};
    result.patients = await Patient.count({});
    result.doctors = await Doctor.count({});
    result.appointments = await Appointment.count({});
    Object.keys(connection.connections[0].collections).forEach(collectionName => connection.connections[0].collection(collectionName).drop());
    return NextResponse.json(
        {
          body: {
            data: result,
            message: "OK",
          },
        },
        { int: { status: 200 } }
      );
  } catch (e) {
    return NextResponse.json(
      {
        body: {
          message: `Server error, please try again! ${e}`,
        },
      },
      { int: { status: 500 } }
    );
  }
}

async function readStreamJSON(stream) {
  const reader = stream.getReader();
  const readableStream = await new ReadableStream({
    start(controller) {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          push();
        });
      }
      push();
    },
  });
  return new Response(readableStream, { headers: { "Content-Type": "text/json" } }).text();
}

