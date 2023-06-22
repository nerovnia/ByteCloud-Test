import Appointments from "./input/Appointments";
import Doctors from "./input/Doctors";
import Patients from "./input/Patients";
import {useState, useEffect} from "react";
import { validateRegisterRecords } from "../service/validators";

export default function AddBlock() {
  const [registrationData, setRegistrationData] = useState({});

  // ----------------------------- Delete in production
  useEffect(() => {
    console.log(registrationData);
  }, [registrationData]);
  // -----------------------------

  function handleChangePatients(event) {
    const {doctors, appointments} = registrationData;
    setRegistrationData({
      doctors,
      appointments,
      patients: event.target.value
    });
  }

  function handleChangeDoctors(event) {
    const {patients, appointments} = registrationData;
    setRegistrationData({
      doctors: event.target.value,
      appointments,
      patients
    });
  }

  function handleChangeAppointments(event) {
    const {patients, doctors} = registrationData;
    setRegistrationData({
      doctors,
      appointments: event.target.value,
      patients
    });
  }

  function handleSendData() {
    //if(registrationData?.appointments)
    console.dir(validateRegisterRecords(registrationData));
    setRegistrationData({});
    document.querySelector("#frmAddRegistrationData").reset();
    //console.log("SendData");
  }

  function handleClearDB() {
    console.log("Clear DB");
  }

  return (
    <>
      <form id="frmAddRegistrationData">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <Patients onPatients={handleChangePatients}></Patients>
            </div>
            <div className="col">
              <Doctors onDoctors={handleChangeDoctors}></Doctors>
            </div>
            <div className="col">
              <Appointments onAppointments={handleChangeAppointments}></Appointments>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2 mb-2">
          <button className="btn btn-primary me-md-2" type="button" onClick={handleSendData}>
            Send Data
          </button>
          <button className="btn btn-primary" type="button" onClick={handleClearDB}>
            Clear DB
          </button>
        </div>
      </form>
    </>
  );
}
