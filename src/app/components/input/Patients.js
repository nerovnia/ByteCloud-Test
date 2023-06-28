export default function Patients(props) {
  return (<>
    <p>Patients</p>
    <textarea data-test={props["dataTest"]} rows="15" cols="30" onChange={props.onPatients} onPaste={props.onPatients}></textarea>
  </>)
}
