import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ClearDBModal(props) {
  return (
    <Modal 
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Clear DB Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {
          (((props.reportdata.patients === 0)) &&
          ((props.reportdata.appointments === 0)) &&
          ((props.reportdata.doctors === 0))) && <span>Database is already clear!</span>
          }
        </div>
        <div>
          <p>Patients: deleted {props.reportdata.patients} records.</p>
          <p>Doctors: deleted {props.reportdata.doctors} records.</p>
          <p>Appointments: deleted {props.reportdata.appointments} records.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
