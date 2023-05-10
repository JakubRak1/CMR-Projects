import { Modal } from "react-bootstrap";

const ModalMessage = (props) => {
  return (
    <Modal
      size="lg"
      show={props.modalMessageOpen}
      onHide={() => {
        props.setModalMessageOpen(false);
        window.location.reload();
      }}
      aria-labelledby="Wiadomość od serwera"
    >
      <Modal.Header closeButton />
      <Modal.Body>{props.message}</Modal.Body>
    </Modal>
  );
};
export default ModalMessage;
