import {useEffect} from "react";

export default function Appointments(props) {
  useEffect(() => {
    if (props.appointments) {
    document.querySelector("#appointmentsArea").textContent = props.appointments;
    }
  }, [props.appointments]);

  return (<>
      <p>Appointments</p>
      <textarea id="appointmentsArea" data-test={props["dataTest"]} rows="15" cols="30" onChange={props.onAppointments} onPaste={props.onAppointments}></textarea>
  </>)
}