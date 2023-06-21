export default function Doctors(props) {
  return (<>
    <p>Doctors</p>
    <textarea rows="15" cols="30" onChange={props.onDoctors}></textarea>
  </>)
}