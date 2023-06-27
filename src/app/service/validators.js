export default function validateRegisterRecords(records) {
  if (!records) {
    return {};
  }

  return {
    appointments: (isString(records?.appointments)) ? validateRecords("appointment", records.appointments, validateAppointment, parseToAppointment) : {},
    doctors: (isString(records?.doctors)) ? validateRecords("doctor", records.doctors, validatePerson, parseToPerson) : {},
    patients: (isString(records?.patients)) ? validateRecords("patient", records.patients, validatePerson, parseToPerson) : {},
  }
}

function validateRecords(type, records, validateFunction, transformToObject) {
  const result = {
    type: type,
    successful: [],
    wrongFormat: [],
    duplicates: []
  };
  records.split("\n").forEach(origRecord => {
    let record = origRecord.trim().replaceAll(/\s+/g, " ");
    switch(validateFunction(result.successful.slice(), record)) {
      case "success":
        result.successful.push(transformToObject(record));
        break;
      case "wrong":
        result.wrongFormat.push(record);
        break;
      case "duplicate":
        result.duplicates.push(record);
        break;
        }
  });
  console.dir(result);
  return result;
}

function validatePerson(successPersons, person) {
  console.log('validatePerson');
  const personDataArr = person.split(',').map(p => p.trim());
  if ((personDataArr.length < 2) || (personDataArr.length > 4)) {
    return "wrong";
  }

  //if (successPersons.filter(p => p === person.trim()).length > 0) {
  if (successPersons.filter(p => {
    console.dir(p);
    console.log(`${p} === ${person.trim()}`);
    return p === person.trim();
  }).length > 0) {
    return "duplicate";
  }

  if((Number.parseInt(personDataArr[0]) > 0) && (isRightAppHoursString(personDataArr[1]))) {
    if ((personDataArr.length > 2) && (!isRightPersonName(personDataArr[2]))) {
      if ((personDataArr.length === 3) && (isRightDateString(personDataArr[2]))) {
        return "success";
      }
      return "wrong";
    }
    if ((personDataArr.length > 3) && (!isRightDateString(personDataArr[3]))) {
      return "wrong";
    }
    return "success";
  }
  return "wrong";
}


function validateAppointment(successAppointments, appointment) {
  console.log('validateAppointment');
  const appointmentDataArr = appointment.split(',').map(p => p.trim());
  if ((appointmentDataArr.length < 2) || (appointmentDataArr.length > 3)) {
    return "wrong";
  }

  if (successAppointments.filter(p => p === appointment.trim()).length > 0) {
    return "duplicate";
  }

  if((Number.parseInt(appointmentDataArr[0]) > 0) && (Number.parseInt(appointmentDataArr[1]) > 0)) {
    if (appointmentDataArr.length === 2) {
      return "success";
    }
    if ((appointmentDataArr.length === 3) && ((Number.parseInt(appointmentDataArr[2]) > 0) && ((!Number.parseInt(appointmentDataArr[2]) < 24)))) {
        return "success";
    }
    return "wrong";
  }
  return "wrong";
}

function parseToPerson(personStr) {
  const result = {};
  const arrStrFields = personStr.split(',').map(personStrField => personStrField.trim());
  result.id = Number.parseInt(arrStrFields[0]);
  result.hours = {};
  const arrHours = arrStrFields[1].split('-').map(hourStr => Number.parseInt(hourStr));
  result.hours.start = arrHours[0];
  result.hours.end = arrHours[1];
  if(arrStrFields.length > 2) {
    if (isRightPersonName(arrStrFields[2])) {
      result.personName = arrStrFields[2];
    } else {
      result.birthDate = arrStrFields[2];
    }
  }
  return result;
}

function parseToAppointment(appointmentStr) {
  const result = {};
  const arrStrFields = appointmentStr.split(',').map(personStrField => personStrField.trim());
  result.patient = Number.parseInt(arrStrFields[0]);
  result.doctor = Number.parseInt(arrStrFields[1]);
  if (arrStrFields.length > 2) {
    result.hour = Number.parseInt(arrStrFields[2]);
  }
  return result;
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
203, 16-18, 01.01.1980, 01.01.1980


Appointments
101, 201, 10
101, 202, 14
102, 201, 11
102, 202, 11
102, 202

102, 201, 11
102, 201, 11, 10
104,
105,,1







101,   201, 10
101, 202,    14
102,   201, 11
102, 202, 11
102,   202

102, 201, 11
102, 201,   11, 10
104,
105,   ,1








*/