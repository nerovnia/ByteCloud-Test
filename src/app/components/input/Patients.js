export default function Patients(props) {
  return (<>
    <p>Patients</p>
    <textarea rows="15" cols="30" onChange={props.onPatients}></textarea>
  </>)
}
