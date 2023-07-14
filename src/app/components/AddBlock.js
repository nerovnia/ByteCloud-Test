import Appointments from "./input/Appointments";
import Doctors from "./input/Doctors";
import Patients from "./input/Patients";
import { useState, useEffect } from "react";
import { validateRegisterRecords } from "../service/validators";
import SaveModal from "./report/SaveModal";
import Fetch from "@/app/useFetch"

import { InferGetServerSidePropsType, GetServerSideProps } from "next";
//import { addCollection } from "@/utils/dbOperations";

export default function AddBlock() {
  const [registrationData, setRegistrationData] = useState({});
  const [registrationDataForModal, setRegistrationDataForModal] = useState({});
  const [saveModalShow, setSaveModalShow] = useState(false);

  // ----------------------------- Delete in production
  useEffect(() => {}, [registrationData]);
  // -----------------------------

  function handleAutofill() {
    const { get } = Fetch("/api/");
    get("test-data").then((testData) => {
      //console.log(testData.body.data);
      setRegistrationDataForModal(testData.body.data);
    });
  }

  function handleChangePatients(event) {
    const { doctors, appointments } = registrationData;
    setRegistrationData({
      doctors,
      appointments,
      patients: event.target.value,
    });
  }

  function handleChangeDoctors(event) {
    const { patients, appointments } = registrationData;
    setRegistrationData({
      doctors: event.target.value,
      appointments,
      patients,
    });
  }

  function handleChangeAppointments(event) {
    const { patients, doctors } = registrationData;
    setRegistrationData({
      doctors,
      appointments: event.target.value,
      patients,
    });
  }

  function handleSendData() {
    //dbOperations.addCollection();
    console.log(registrationData);
    if(Object.keys(registrationDataForModal).length === 0) {
      setRegistrationDataForModal(registrationData);
    }
    setSaveModalShow(true);
    document.querySelector("#frmAddRegistrationData").reset();
  }

  function handleClearDB() {
    console.log("Clear DB");
  }

  function saveModalClose() {
    setSaveModalShow(false);
    setRegistrationDataForModal({});
    setRegistrationData({});
  }

  return (
    <>
      <form id="frmAddRegistrationData" className="mb-auto">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <Patients
                patients={registrationDataForModal.patients}
                dataTest="patients"
                onPatients={handleChangePatients}
              ></Patients>
            </div>
            <div className="col">
              <Doctors
                doctors={registrationDataForModal.doctors}
                dataTest="doctors"
                onDoctors={handleChangeDoctors}
              ></Doctors>
            </div>
            <div className="col">
              <Appointments 
                appointments={registrationDataForModal.appointments}
                dataTest="appointments"
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
        reportdata={validateRegisterRecords(registrationDataForModal)}
        onHide={() => saveModalClose()}
      />
    </>
  );
}
