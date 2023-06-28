export default function Doctors(props) {
  return (<>
    <p>Doctors</p>
    <textarea data-test={props["dataTest"]} rows="15" cols="30" onChange={props.onDoctors} onPaste={props.onDoctors}></textarea>
  </>)
}