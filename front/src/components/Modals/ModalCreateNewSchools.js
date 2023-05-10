import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import api from "../../api/apiConfig";
import ModalMessage from "./ModalMessage";

// VALIDATION TO DO!!!!!!
const URL_POST = "/schools/create-new";

const ModalCreateNewSchools = (props) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    schoolName: "",
    streetName: "",
    buildingNumber: "",
    phoneNumber: "",
    additionalInformation: "",
  });

  const saveDataToCookies = () => {
    Object.keys(formData).forEach((key) => {
      Cookies.set(key, formData[key], { expires: null });
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    saveDataToCookies();
  };

  const handlePostNewRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(URL_POST, formData);
      if (response.status === 200) {
        setMessage("Pomyślnie dodano nowy rekord");
        setModalMessageOpen(true);
        props.setModalCreateOpen(false);
      }
    } catch (err) {
      if (err.response) {
        setMessage(
          `Brak możliwości dodania nowego rekoru, sprawdź czy taki juz nie istnieje i spróbuj ponownie ${err}`
        );
      } else if (err.request) {
        setMessage("Bład połączenia, spróbuj ponownie za jakiś czas");
      }
      setModalMessageOpen(true);
      props.setModalCreateOpen(false);
    }
  };

  useEffect(() => {
    const savedData = Cookies.get();
    setFormData({
      schoolName: savedData.school_name || "",
      streetName: savedData.street_name || "",
      buildingNumber: savedData.building_number || "",
      phoneNumber: savedData.phone_number || "",
      additionalInformation: savedData.additional_information || "",
    });
  }, []);

  return (
    <div>
      <Modal
        size="lg"
        show={props.modalCreateOpen}
        onHide={() => props.setModalCreateOpen(false)}
        aria-labelledby="Dodaj nowy rekord danej kategori"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Dodaj nowy rekord do bazy danych
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePostNewRecord}>
            <label>Nazwa placówki</label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="schoolName"
              name="schoolName"
              required
              onChange={handleInputChange}
              value={formData.schoolName}
            />
            <label>Nazwa ulicy</label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="streetName"
              name="streetName"
              required
              onChange={handleInputChange}
              value={formData.streetName}
            />
            <label>Numer budynku</label>
            <input
              className="form-control mt-2 mb-2"
              type="number"
              id="buildingNumber"
              name="buildingNumber"
              required
              onChange={handleInputChange}
              value={formData.buildingNumber}
            />
            <label>Numer telefonu</label>
            <input
              className="form-control mt-2 mb-2"
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              required
              onChange={handleInputChange}
              value={formData.phoneNumber}
            />
            <label>Dodatkowe informacje</label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="additionalInformation"
              name="additionalInformation"
              onChange={handleInputChange}
              value={formData.additionalInformation}
            />
            <button className="btn btn-primary mt-3 mb-2 p-3" id="submit-btn">
              Dodaj
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <ModalMessage
        modalMessageOpen={modalMessageOpen}
        message={message}
        setModalMessageOpen={setModalMessageOpen}
      />
    </div>
  );
};
export default ModalCreateNewSchools;
