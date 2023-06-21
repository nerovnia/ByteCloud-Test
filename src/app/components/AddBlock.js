import Appointments from "./input/Appointments";
import Doctors from "./input/Doctors";
import Patients from "./input/Patients";
import {useState, useEffect} from "react";

export default function AddBlock() {
  const [fullData, setFullData] = useState({});

  // ----------------------------- Delete in production
  useEffect(() => {
    console.log(fullData);
  }, [fullData]);
  // -----------------------------
  
  function handleChangePatients(event) {
    const {doctors, appointments} = fullData;
    setFullData({
      doctors: doctors,
      appointments: appointments,
      patients: event.target.value
    });
  }

  function handleChangeDoctors(event) {
    const {patients, appointments} = fullData;
    setFullData({
      doctors: event.target.value,
      appointments: appointments,
      patients: patients
    });
  }

  function handleChangeAppointments(event) {
    const {patients, doctors} = fullData;
    setFullData({
      doctors: doctors,
      appointments: event.target.value,
      patients: patients
    });
  }

  return (
    <>
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
        <button className="btn btn-primary me-md-2" type="button">
          Send Data
        </button>
        <button className="btn btn-primary" type="button">
          Clear DB
        </button>
      </div>
    </>
  );
}
