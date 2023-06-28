import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ReportList from "./ReportList";

export default function SaveModal(props) {
  function isEmptyObj(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }
  return (
    <Modal 
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Save Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {
          ((isEmptyObj(props.reportdata.appointments)) &&
          (isEmptyObj(props.reportdata.patients)) &&
          (isEmptyObj(props.reportdata.doctors))) && <span>You don't added any record!</span>
          }
        </div>
        <div>
        {(props?.reportdata?.appointments?.successful?.length > 0)&& <ReportList strRecArr={props.reportdata.appointments.successful} header="Successful Appointments"/>}
        {(props?.reportdata?.appointments?.wrongFormat?.length > 0) && <ReportList strRecArr={props.reportdata.appointments.wrongFormat} header="Wrong Format Appointments"/>}
        {(props?.reportdata?.appointments?.duplicates?.length > 0) && <ReportList strRecArr={props.reportdata.appointments.duplicates} header="Duplicates Appointments"/>}
        </div>
        <div>
        {(props?.reportdata?.patients?.successful?.length > 0) && <ReportList strRecArr={props.reportdata.patients.successful} header="Successful Patients"/>}
        {(props?.reportdata?.patients?.wrongFormat?.length > 0) && <ReportList strRecArr={props.reportdata.patients.wrongFormat} header="Wrong Format Patients"/>}
        {(props?.reportdata?.patients?.duplicates?.length > 0) && <ReportList strRecArr={props.reportdata.patients.duplicates} header="Duplicates Patients"/>}
        </div>
        <div>
        {(props?.reportdata?.doctors?.successful?.length > 0) && <ReportList strRecArr={props.reportdata.doctors.successful} header="Successful Doctors"/>}
        {(props?.reportdata?.doctors?.wrongFormat?.length > 0) && <ReportList strRecArr={props.reportdata.doctors.wrongFormat} header="Wrong Format Doctors"/>}
        {(props?.reportdata?.doctors?.duplicates?.length > 0) && <ReportList strRecArr={props.reportdata.doctors.duplicates} header="Duplicates Doctors"/>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
