import Appointments from "./input/Appointments";
import Doctors from "./input/Doctors";
import Patients from "./input/Patients";
import {useState} from "react";

export default function AddBlock() {
  const {fullData, setFullData} = useState({});


  return (
    <>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <Patients></Patients>
          </div>
          <div class="col">
            <Doctors></Doctors>
          </div>
          <div class="col">
            <Appointments></Appointments>
          </div>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2 mb-2">
        <button class="btn btn-primary me-md-2" type="button">
          Send Data
        </button>
        <button class="btn btn-primary" type="button">
          Clear DB
        </button>
      </div>
    </>
  );
}
