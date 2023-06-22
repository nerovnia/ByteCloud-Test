export function validateRegisterRecords(records) {
  console.log(records.patients);
  if (!records) {
    return {};
  }

  return {
    appointments: (isString(records?.appointments)) ? validateAppointments(records.appointments) : {},
    doctors: (isString(records?.doctors)) ? validateDoctors(records.doctors) : {},
    patients: (isString(records?.patients)) ? validatePatients(records.patients) : {},
  }
}
/*
function validateDoctors(doctors) {
  const result = {
    successful: [],
    wrongFormat: [],
    duplicates: []
  };

  doctors.split("\n").forEach(doctor => {
    switch(validateDoctor(doctor)) {
      case "success":
        result.success.push(doctor);
        break;
      case "wrong":
        result.wrong.push(doctor);
        break;
      case "duplicate":
        result.duplicate.push(doctor);
        break;
        }
  });
  return result;
}

function validateAppointments(appointments) {
  return {
    successful: appointments,
    wrongFormat: "",
    duplicates: ""
  };
}
*/
function validatePatients(patients) {
  const result = {
    successful: [],
    wrongFormat: [],
    duplicates: []
  };
  patients.split("\n").forEach(patient => {
    switch(validatePatient(result.successful.slice(), patient)) {
      case "success":
        result.successful.push(patient);
        break;
      case "wrong":
        result.wrongFormat.push(patient);
        break;
      case "duplicate":
        result.duplicate.push(patient);
        break;
        }
  });
  console.dir(result);
  return result;
}
/*
function validateDoctor(doctor) {
  console.log(doctor);
  return true;
}

function validateAppointment(appointment) {
  console.log('validateAppointment');
  return true;
}
*/



function validatePatient(successPatients, patient) {
  console.log('validatePatient');
  //const patientDataArr = transformToPatientObj(patient.split(',').map(p => p.trim()));
  const patientDataArr = patient.split(',').map(p => p.trim());
  if ((patientDataArr.length < 2) || (patientDataArr.length > 4)) {
    return "wrong";
  }

  if (successPatients.filter(p => p === patient).length > 0) {
    return "duplicate";
  }

  if((Number.parseInt(patientDataArr[0]) > 0) && (isRightAppHoursString(patientDataArr[1]))) {
    if ((patientDataArr.length > 2) && (!isRightPersonName(patientDataArr[2]))) {
      return "wrong";
    }
    if ((patientDataArr.length > 3) && (!isRightDateString(patientDataArr[3]))) {
      return "wrong";
    }
    return "success";
  }
  return "wrong";
}


function isRightPersonName(str) {
  return /^\s*([A-Za-z])+\s*([A-Za-z])*\s*$/.test(str);
}

function isRightAppHoursString(str) {
  const hours = (/^\s*([0-9]|0[0-9]|1[0-9]|2[0-2])-([0-9]|0[0-9]|1[0-9]|2[0-3])\s*$/.exec(str));
  if(hours && (Number.parseInt(hours[1]) < Number.parseInt(hours[2]))) {
    return true;
  }
  return false;
}

function isRightDateString(str) {
  return /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/.test(str);
}


function isString(str) { return (typeof str === 'string') }

function isEmptyString(str) { return (str.trim() === '') }


/*
function transformToPatientObj(patientFieldsArr) {
  if((patientFieldsArr.length < 2) || (patientFieldsArr.length > 4)){
    return {};
  }
  if ((isID(patientFieldsArr[0])) && (isTime(patientFieldsArr[1])) && (isName(patientFieldsArr[2])) && (isBirthDate(patientFieldsArr[3]))) {

  }
}
*/

/*
function parseAppHours(str) {
  const hours = (/^\s*([0-9]|0[0-9]|1[0-9]|2[0-2])-([0-9]|0[0-9]|1[0-9]|2[0-3])\s*$/.exec(str));
  if((hours) && (Number.parseInt(hours[1]) < Number.parseInt(hours[2]))) {
    return {
      startHour: Number.parseInt(hours[1]),
      endHour: Number.parseInt(hours[2])
    }
  }
  return {
    startHour: -1,
    endHour: -1
  };
}
*/


/*
function formatDateString(str) {
  const dateStrArr = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/.exec(str)
  if(dateStrArr) {
    return `${dateStrArr[1]}.${dateStrArr[2]}.${dateStrArr[3]}`;
  }
return "";
}
*/
/* 
Patients
101, 10-12, James Davis, 31.12.1999
102, 11-12, Mary
103, 8-12


101, 10-12, James Davis, 31.12.1999
102, 11-12, Mary
103, 8-12
103, 8-12 
102, 11-12, Mary FGH gh
101, 0-12, James Davis, 31.12.1999
101, 13-2, James Davis, 31.12.1999
101, 2-13, James Davis, 31.13.1999
101, 2, James Davis, 31.11.1999





Doctors
201, 10-13
202, 10-15, Robert
203, 16-18, 01.01.1980


Appointments
101, 201, 10
101, 202, 14
102, 201, 11
102, 202, 11

*/