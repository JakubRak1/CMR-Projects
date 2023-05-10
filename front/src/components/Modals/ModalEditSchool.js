import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ModalMessage from "./ModalMessage";
import api from "../../api/apiConfig";

const ModalEditSchool = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [schoolNameEdit, setSchoolNameEdit] = useState("");
  const [validSchoolNameEdit, setValidSchoolNameEdit] = useState(false);

  const [streetNameEdit, setStreetNameEdit] = useState("");
  const [validStreetNameEdit, setValidStreetNameEdit] = useState(false);

  const [buildingNumberEdit, setBuildingNumberEdit] = useState("");
  const [validBuildingNumberEdit, setValidBuildingNumberEdit] = useState(false);

  const [phoneNumberEdit, setPhoneNumberEdit] = useState("");
  const [validPhoneNumberEdit, setValidPhoneNumberEdit] = useState(false);

  const [additionalInformationEdit, setAdditionalInformationEdit] =
    useState("");

  const [validationErrorSchoolName, setValidationErrorSchoolName] =
    useState("");
  const [validationErrorStreetName, setValidationErrorStreetName] =
    useState("");
  const [validationErrorBuildingNumber, setValidationErrorBuildingNumber] =
    useState("");
  const [validationErrorPhoneNumber, setValidationErrorPhoneNumber] =
    useState("");

  // Validation
  const editRecord = async (e) => {
    const URL_PATCH = `schools/id${props.id}`;
    e.preventDefault();
    const dataToPatch = {
      schoolName: { schoolNameEdit },
      streetName: { streetNameEdit },
      buildingNumber: { buildingNumberEdit },
      phoneNumber: { phoneNumberEdit },
      additionalInformation: { additionalInformationEdit },
    };
    try {
      const response = await api.patch(URL_PATCH, dataToPatch);
      if (response.status === 200) {
        setMessage("Pomyślnie zedytowano rekord");
        setModalMessageOpen(true);
        props.setModalEditOpen(false);
      }
    } catch (err) {
      if (err.response) {
        setMessage("Nie można zedytować rekordu spróbuj ponownie później");
      } else if (err.request) {
        setMessage("Błąd połączenia, spróbuj ponownie za jakiś czas");
      }
      setModalMessageOpen(true);
      props.setModalEditOpen(false);
    }
  };

  useEffect(() => {
    let result = true;
    setValidationErrorSchoolName("");
    if (schoolNameEdit.length < 2 || schoolNameEdit.length > 100) {
      result = false;
      setValidationErrorSchoolName("Nazwa jest za krótka lub za długa");
    } else if (!/^[a-zA-Z0-9\s\-']+$/.test(schoolNameEdit)) {
      result = false;
      setValidationErrorSchoolName("Nazwa posiada niedozwole symbole");
    }
    setValidSchoolNameEdit(result);
  }, [schoolNameEdit]);

  useEffect(() => {
    let result = true;
    setValidationErrorStreetName("");
    if (streetNameEdit.length < 2 || streetNameEdit.length > 50) {
      result = false;
      setValidationErrorStreetName("Nazwa jest za krótka lub za długa");
    } else if (!/^[a-zA-Z0-9\s\.'-]+$/.test(streetNameEdit)) {
      result = false;
      setValidationErrorStreetName("Nazwa posiada niedozwole symbole");
    }
    setValidStreetNameEdit(result);
  }, [streetNameEdit]);

  useEffect(() => {
    let result = true;
    setValidationErrorBuildingNumber("");
    if (buildingNumberEdit.length < 1 || buildingNumberEdit.length > 10) {
      result = false;
      setValidationErrorBuildingNumber(
        "Numer budynku musi zawierać się od 1 znaku do 10"
      );
    }
    setValidBuildingNumberEdit(result);
  }, [buildingNumberEdit]);

  useEffect(() => {
    let result = true;
    setValidationErrorPhoneNumber("");
    if (phoneNumberEdit < 111111111 || phoneNumberEdit > 999999999) {
      result = false;
      setValidationErrorPhoneNumber(
        "Format numeru telefonu musi być bez numeru kierunkowego"
      );
    }
    setValidPhoneNumberEdit(result);
  }, [phoneNumberEdit]);

  return (
    <>
      <Modal
        size="lg"
        show={props.modalEditOpen}
        onHide={props.setModalEditOpen}
        aria-labelledby="Edytuj rekord"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Edytuj {props.schoolName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={editRecord}>
            <div
              className={
                validSchoolNameEdit || !schoolNameEdit ? "hidden" : "invalid"
              }
            >
              {validationErrorSchoolName}
            </div>
            <label>
              Nazwa placówki
              <span className={validSchoolNameEdit ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validSchoolNameEdit || !schoolNameEdit ? "hidden" : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              required
              onChange={(e) => setSchoolNameEdit(e.target.value)}
              value={schoolNameEdit}
              aria-invalid={validSchoolNameEdit ? "false" : "true"}
            />
            <div
              className={
                validStreetNameEdit || !streetNameEdit ? "hidden" : "invalid"
              }
            >
              {validationErrorStreetName}
            </div>
            <label>
              Nazwa ulicy
              <span className={validStreetNameEdit ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validStreetNameEdit || !streetNameEdit ? "hidden" : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              required
              onChange={(e) => setStreetNameEdit(e.target.value)}
              value={streetNameEdit}
              aria-invalid={validStreetNameEdit ? "false" : "true"}
            />
            <div
              className={
                validBuildingNumberEdit || !buildingNumberEdit
                  ? "hidden"
                  : "invalid"
              }
            >
              {validationErrorBuildingNumber}
            </div>
            <label>
              Numer budynku
              <span className={validBuildingNumberEdit ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validBuildingNumberEdit || !buildingNumberEdit
                    ? "hidden"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="number"
              required
              onChange={(e) => setBuildingNumberEdit(e.target.value)}
              value={buildingNumberEdit}
              aria-invalid={validBuildingNumberEdit ? "false" : "true"}
            />
            <div
              className={
                validPhoneNumberEdit || !phoneNumberEdit ? "hidden" : "invalid"
              }
            >
              {validationErrorPhoneNumber}
            </div>
            <label>
              Numer telefonu
              <span className={validPhoneNumberEdit ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validPhoneNumberEdit || !phoneNumberEdit
                    ? "hidden"
                    : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="form-control mt-2 mb-2"
              type="number"
              required
              onChange={(e) => setPhoneNumberEdit(e.target.value)}
              value={phoneNumberEdit}
              aria-invalid={validPhoneNumberEdit ? "false" : "true"}
            />
            <label>Dodatkowe informacje</label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              onChange={(e) => setAdditionalInformationEdit(e.target.value)}
              value={additionalInformationEdit}
            />
            <button
              className="btn btn-primary mt-3 mb-2 p-3"
              id="submit-btn"
              disabled={
                !validSchoolNameEdit ||
                !validStreetNameEdit ||
                !validBuildingNumberEdit ||
                !validSchoolNameEdit
                  ? true
                  : false
              }
            >
              Edytuj
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <ModalMessage
        modalMessageOpen={modalMessageOpen}
        message={message}
        setModalMessageOpen={setModalMessageOpen}
      />
    </>
  );
};
export default ModalEditSchool;
