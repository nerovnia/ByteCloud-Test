import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

const maxTestPatients = 20;
const maxTestDoctors = 5;

const maxAmountAppointments = 40;
const maxAmountPatientAttempt = 3;
const minShiftHour = 6;
const maxShiftHour = 20;

const TEST_DATA_DIR = process.env.TEST_DATA_DIR;

// Define the path to the test data file
const testDataDirectory = path.join(process.cwd(), TEST_DATA_DIR, 'right-data.json');

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
      doctors: getRandomPersonArray(patientsAndDoctors.doctors, maxTestDoctors),
    };


    const doctorsIdSet = new Set(result.doctors.map(doctor => doctor.id));
    const patientsIdSet = new Set(result.patients.map(patient => patient.id));
  
    result.appointments = getRandomAppointmentsArray(maxAmountAppointments, maxAmountPatientAttempt,  doctorsIdSet, patientsIdSet, minShiftHour, maxShiftHour);   

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
 * @name getRandomAppointmentsArray
 * @param {number} maxAmountAppointments - max amount of appointments to generate
 * @param {Set} doctorsIdSet - a Set of doctors ids
 * @param {Set} patientsIdSet - a Set of patients ids
 * @param {number} minShiftHour - an hour start of shift
 * @param {number} maxShiftHour - an hour end of shift
 * @returns {Array} - an array of appointment
 */
function getRandomAppointmentsArray(maxAmountAppointments, maxAmountPatientAttempt,  doctorsIdSet, patientsIdSet, minShiftHour, maxShiftHour) {
  const result = [];
  while (result.length < maxAmountAppointments) {
    result.push({
      patient: [...patientsIdSet].at(getRandomInt(patientsIdSet.size)),
      doctor: [...doctorsIdSet].at(getRandomInt(doctorsIdSet.size)),
      hour: getRandomInt(maxShiftHour - minShiftHour) + minShiftHour
    });
  }
  return result
}

/*
In FreeData I need for patients and doctors shifts if tham hours more then fore can be devided or not on some part
less then six on two different or similiar part
more then six on three parts 

*/