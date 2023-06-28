export default function ReportList(props) {
  
  const listItems = props.strRecArr.map((rec, index) => <p key={index}>{rec.str}</p>);
  return (<>
    <h4>{props.header}</h4>
    {listItems}
  </>)
}

