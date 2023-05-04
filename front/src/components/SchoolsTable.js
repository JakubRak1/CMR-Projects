import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../api/apiConfig";
import "../static/styles/schoolTable.css";

const SchoolsTable = ({
  id,
  schoolName,
  streetName,
  buildingNumber,
  phoneNumber,
  additionalInformation,
  onCheckboxChange,
}) => {
  // Modal for edit/delete
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [schoolNameEdit, setSchoolNameEdit] = useState("");
  const [validSchoolNameEdit, setValidSchoolNameEdit] = useState(false);

  const [streetNameEdit, setStreetNameEdit] = useState("");
  const [validStreetNameEdit, setValidStreetNameEdit] = useState(false);

  const [buildingNumberEdit, setBuildingNumberEdit] = useState("");
  const [validBuildingNumberEdit, setValidBuildingNumberEdit] = useState(false);

  const [phoneNumberEdit, setPhoneNumberEdit] = useState("");
  const [validPhoneNumberEdit, setValidPhoneNumberEdit] = useState(false);

  const [validationErrorSchoolName, setValidationErrorSchoolName] =
    useState("");
  const [validationErrorStreetName, setValidationErrorStreetName] =
    useState("");
  const [validationErrorBuildingNumber, setValidationErrorBuildingNumber] =
    useState("");
  const [validationErrorPhoneNumber, setValidationErrorPhoneNumber] =
    useState("");

  const [additionalInformationEdit, setAdditionalInformationEdit] =
    useState("");

  // Error Modal
  const [isModalOpenMsg, setIsModalOpenMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const URL_PATCH = `schools/id${id}`;
  const URL_DELETE = `schools/id${id}`;

  const handleOpenModalEdit = () => {
    setIsModalOpenEdit(true);
  };
  const handleCloseModalEdit = () => {
    setIsModalOpenEdit(false);
  };

  const handleOpenModalDelete = () => {
    setIsModalOpenDelete(true);
  };
  const handleCloseModalDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleOpenModalMsg = () => {
    setIsModalOpenMsg(true);
  };
  const handleCloseModalMsg = () => {
    setIsModalOpenMsg(false);
    window.location.reload();
  };

  const handleCheckboxChange = (event) => {
    onCheckboxChange(event.target.value, event.target.checked);
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

  // Change for validated name/number than change
  const editRecord = async (e) => {
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
        setErrMsg("Pomyślnie zedytowano rekord");
        handleCloseModalEdit();
        handleOpenModalMsg();
      }
    } catch (err) {
      if (err.response) {
        setErrMsg("Nie można zedytować rekordu spróbuj ponownie później");
        handleCloseModalEdit();
        handleOpenModalMsg();
      } else if (err.request) {
        setErrMsg("Błąd połączenia, spróbuj ponownie za jakiś czas");
        handleCloseModalEdit();
        handleOpenModalMsg();
      }
    }
  };

  const deleteRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await api.delete(URL_DELETE);
      if (response.status === 200) {
        setErrMsg("Pomyślnie usunięto rekord");
        handleCloseModalDelete();
        handleOpenModalMsg();
      }
    } catch (err) {
      if (err.response) {
        setErrMsg("Nie można zedytować rekordu spróbuj ponownie później");
        handleCloseModalDelete();
        handleOpenModalMsg();
      } else if (err.request) {
        setErrMsg("Błąd połączenia, spróbuj ponownie za jakiś czas");
        handleCloseModalDelete();
        handleOpenModalMsg();
      }
    }
  };

  useEffect(() => {
    setSchoolNameEdit(schoolName);
    setStreetNameEdit(streetName);
    setBuildingNumberEdit(buildingNumber);
    setPhoneNumberEdit(phoneNumber);
    setAdditionalInformationEdit(additionalInformation);
  }, []);

  return (
    <>
      <tr key={id}>
        <td>{schoolName}</td>
        <td>{streetName}</td>
        <td>{buildingNumber}</td>
        <td>{phoneNumber}</td>
        <td>{additionalInformation}</td>
        <td>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={handleCheckboxChange}
            value={id}
          />
          <button onClick={handleOpenModalDelete}>Usuń</button>
          <button onClick={handleOpenModalEdit}>Edytuj</button>
        </td>
      </tr>

      <Modal
        size="lg"
        show={isModalOpenEdit}
        onHide={handleCloseModalEdit}
        aria-labelledby="Edytuj rekord"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Edytuj {schoolName}</Modal.Title>
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
              // Required ??? to consult
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

      <Modal
        size="lg"
        show={isModalOpenDelete}
        onHide={handleCloseModalDelete}
        aria-labelledby="Usuń z bazy danych"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Usuń</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={deleteRecord}>
            <label>Czy na pewno chcesz usunąć zaznaczone rekory {id}</label>
            <button className="btn btn-primary mt-3 mb-2 p-3" id="submit-btn">
              Usuń
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={isModalOpenMsg}
        onHide={handleCloseModalMsg}
        aria-labelledby="Wiadomość od serwera"
      >
        <Modal.Header closeButton />
        <Modal.Body>{errMsg}</Modal.Body>
      </Modal>
    </>
  );
};

export default SchoolsTable;
