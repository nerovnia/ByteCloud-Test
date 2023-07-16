import {useEffect} from "react";

export default function Appointments(props) {
  useEffect(() => {
    //if (props.dataTest) {
    document.querySelector("#appointmentsArea").value = props.dataTest;
    //}
  }, [props.dataTest]);

  return (<>
      <p>Appointments</p>
      <textarea id="appointmentsArea" data-test={props.dataTest} rows="15" cols="30" onChange={props.onAppointments} onPaste={props.onAppointments}></textarea>
  </>)
}