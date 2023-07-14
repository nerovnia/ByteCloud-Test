import {useEffect} from "react";

export default function Doctors(props) {
  useEffect(() => {
    if (props.doctors) {
    document.querySelector("#doctorsArea").textContent = props.doctors;
    }
  }, [props.doctors]);

  return (<>
    <p>Doctors</p>
    <textarea id="doctorsArea" data-test={props["dataTest"]} rows="15" cols="30" onChange={props.onDoctors} onPaste={props.onDoctors}></textarea>
  </>)
}
