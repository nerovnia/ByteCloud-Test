import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

// Define the path to the test data file
const testDataDirectory = path.join(process.cwd(), 'test/data', 'right-data.json');
const maxTestPatients = 20;
const maxTestDoctors = 5;

/******************************************************
 * Get a random integer number
 ******************************************************
 * @name getRandomInt
 * @param {number} max - Maximum integer number
 * @returns {number} - Random integer number
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max) ?? -1;
}

/**
 * Get an array of random persons from the provided array
 * @name getRandomPersonArray
 * @param {Array} persons - Array of persons
 * @param {number} max - Maximum number of persons to select
 * @returns {Array} - Array of randomly selected persons
 */
function getRandomPersonArray(persons, max) {
  const personsRandomSet = new Set();
  while (personsRandomSet.size < max) {
    personsRandomSet.add(getRandomInt(persons.length - 1));
  }

  const result = [];
  personsRandomSet.forEach(position => {
    result.push(persons[position]);
  });

  return result;
}

/**
 * Handle the GET request for test data
 * @name GET
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - NextResponse object with the response data
 */
export async function GET(req, res) {
  try {
    // Read the test data from the file
    const patientsAndDoctors = JSON.parse(await fs.readFile(testDataDirectory, 'utf8'));

    // Get random patients and doctors
    const result = {
      patients: getRandomPersonArray(patientsAndDoctors.patients, maxTestPatients),
      doctors: getRandomPersonArray(patientsAndDoctors.doctors, maxTestDoctors)
    };

    // Return the response as JSON
    return NextResponse.json({
      body: {
        data: result,
        message: "OK",
      },
    }, {
      int: { status: 200 }
    });
  } catch (e) {
    // Handle server errors
    return NextResponse.json({
      body: {
        message: `Server error, please try again! ${e}`,
      },
    }, {
      int: { status: 500 }
    });
  }
}


/**
 * Generate appointments
 * @name generateAppointments
 * @param {number} maxAmountAppointments - max amount of appointments to generate
 * @param {number} amountPatientAttempt - max amount of appointment with one doctor
 * @param {Set} doctorsIdSet - a Set of doctors ids
 * @param {Set} patientsIdSet - a Set of patients ids
 * @param {number} minShiftHour - an hour start of shift
 * @param {number} maxShiftHour - an hour end of shift
 * @returns {Array} - an array of appointment
 */
function generateAppointments(maxAmountAppointments, amountPatientAttempt,  doctorsIdSet, patientsIdSet, minShiftHour, maxShiftHour) {

}

/*
In FreeData I need for patients and doctors shifts if tham hours more then fore can be devided or not on some part
less then six on two different or similiar part
more then six on three parts 

*/