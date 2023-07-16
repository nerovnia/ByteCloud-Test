import {useEffect} from "react";

export default function Patients(props) {
  //console.log(props.dataTest);
  useEffect(() => {
    //if (props.dataTest) {
      //document.querySelector("#patientsArea").textContent = props.dataTest;
      document.querySelector("#patientsArea").value = props.dataTest;
      //}
  }, [props.dataTest]);

  return (<>
    <p>Patients</p>
    <textarea id="patientsArea" data-test={props.dataTest} rows="15" cols="30" onChange={props.onPatients} onPaste={props.onPatients}></textarea>
  </>)
}
