import {useEffect} from "react";

export default function Patients(props) {
  useEffect(() => {
    if (props.patients) {
    document.querySelector("#patientsArea").textContent = props.patients;
    }
  }, [props.patients]);

  return (<>
    <p>Patients</p>
    <textarea id="patientsArea" data-test={props["dataTest"]} rows="15" cols="30" onChange={props.onPatients} onPaste={props.onPatients}></textarea>
  </>)
}
