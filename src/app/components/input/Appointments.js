export default function Appointments(props) {
  return (<>
      <p>Appointments</p>
      <textarea rows="15" cols="30" onChange={props.onAppointments}></textarea>
  </>)
}