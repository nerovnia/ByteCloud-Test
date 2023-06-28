export default function Appointments(props) {
  return (<>
      <p>Appointments</p>
      <textarea data-test={props["dataTest"]} rows="15" cols="30" onChange={props.onAppointments} onPaste={props.onAppointments}></textarea>
  </>)
}