import Appointments from "./input/Appointments";
import Doctors from "./input/Doctors";
import Patients from "./input/Patients";
import { useState, useEffect } from "react";
import { validateRegisterRecords } from "../service/validators";
import SaveModal from "./report/SaveModal";
import ClearDBModal from "./report/ClearDBModal";
import Fetch from "@/app/useFetch"

export default function AddBlock() {
  // source data
  const [patients, setPatients] = useState("");
  const [doctors, setDoctors] = useState("");
  const [appointments, setAppointments] = useState("");

  // after validations
  const [verifiedData, setVerifiedData] = useState({});
  const [clearDBData, setClearDBData] = useState({});

  // state of modal dialogues
  const [saveModalShow, setSaveModalShow] = useState(false);
  const [clearDBModalShow, setClearDBModalShow] = useState(false);

  function handleAutofill() {
    const { get } = Fetch("/api/");
    get("test-data").then((testData) => {
      setPatients(testData.body.data.patients);
      setDoctors(testData.body.data.doctors);
      setAppointments(testData.body.data.appointments);
    });
  }

  function handleChangePatients(event) {
    setPatients(event.target.value);
  }

  function handleChangeDoctors(event) {
    setDoctors(event.target.value);
  }

  function handleChangeAppointments(event) {
    setAppointments(event.target.value);
  }

  function handleSendData() {
    // Prepare data for sending
    if((patients !== "") || (doctors !== "") || (appointments !== "")) {
      const validData = validateRegisterRecords({
        patients: patients,
        doctors: doctors,
        appointments: appointments,
      });
      setVerifiedData(validData);
      
      // Send prepared data to server for save
      const dataForSave = {
        patients: validData.patients.successful.map(patient => patient.obj),
        doctors: validData.doctors.successful.map(doctor => doctor.obj),
        appointments: validData.appointments.successful.map(appointment => appointment.obj),
      };
      const { post } = Fetch("/api/");
      post("collections", dataForSave).then((status) => {
        console.log(status);
      });
    }

    // Show save statistic modal window and clear form
    setSaveModalShow(true);
    document.querySelector("#frmAddRegistrationData").reset();
  }

  function handleClearDB() {
    console.log("Clear DB");
    const { del } = Fetch("/api/");
    del("collections").then((status) => {
      setClearDBData(status.body.data);
      //console.log(status);
      setClearDBModalShow(true);

    });
}

  function saveModalClose() {
    setSaveModalShow(false);
    setVerifiedData({});
    setPatients("");
    setDoctors("");
    setAppointments("");
  }

  function clearDBModalClose() {
    setClearDBModalShow(false);
  }
  

  return (
    <>
      <form id="frmAddRegistrationData" className="mb-auto">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <Patients
                patients={verifiedData.patients}
                dataTest={patients}
                onPatients={handleChangePatients}
              ></Patients>
            </div>
            <div className="col">
              <Doctors
                doctors={verifiedData.doctors}
                dataTest={doctors}
                onDoctors={handleChangeDoctors}
              ></Doctors>
            </div>
            <div className="col">
              <Appointments 
                appointments={verifiedData.appointments}
                dataTest={appointments}
                onAppointments={handleChangeAppointments}
              ></Appointments>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2 mb-2">
          <button
            id="autoFill"
            className="btn btn-primary me-md-2"
            type="button"
            onClick={handleAutofill}
          >
            Autofill
          </button>

          <button
            id="sendData"
            className="btn btn-primary me-md-2"
            type="button"
            onClick={handleSendData}
          >
            Send Data
          </button>
          <button
            id="clearDB"
            className="btn btn-primary"
            type="button"
            onClick={handleClearDB}
          >
            Clear DB
          </button>
        </div>
      </form>
      <SaveModal
        show={saveModalShow}
        reportdata={verifiedData}
        onHide={() => saveModalClose()}
      />
      <ClearDBModal
        show={clearDBModalShow}
        reportdata={clearDBData}
        onHide={() => clearDBModalClose()}
      />
    </>
  );
}
