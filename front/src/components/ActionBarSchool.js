import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "../static/styles/actionBarSchool.css";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import api from "../api/apiConfig";
import Cookies from "js-cookie";

// SORTING SORTINNG!!!!!!

const ActionBarSchool = (idToDelete) => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenMsg, setIsModalOpenMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [schoolName, setSchoolName] = useState("");
  const [searchSchoolName, setSearchSchoolName] = useState("");

  const [streetName, setStreetName] = useState("");
  const [searchStreetName, setSearchStreetName] = useState("");

  const [buildingNumber, setBuildingNumber] = useState("");
  const [searchBuildingNumber, setSearchBuildingNumber] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");

  const [additionalInformation, setAdditionalInformation] = useState("");

  const [sortSchoolNameAsc, setSortSchoolNameAsc] = useState(false);
  const [sortSchoolNameDesc, setSortSchoolNameDesc] = useState(false);

  const URL_POST = "/schools/create-new";
  const URL_DELETE_MANY = "/schools";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/schools/sortBySchoolNameAsc") {
      setSortSchoolNameAsc(true);
    } else if (location.pathname === "/schools/sortBySchoolNameDesc") {
      setSortSchoolNameDesc(true);
    }
  }, []);

  // Modal Functions
  const hadleOpenModalCreate = () => {
    setIsModalOpenCreate(true);
  };
  const handleCloseModalCreate = () => {
    Cookies.set("school_name", schoolName, { expires: null });
    Cookies.set("street_name", streetName, { expires: null });
    Cookies.set("building_number", buildingNumber, { expires: null });
    Cookies.set("phone_number", phoneNumber, { expires: null });
    Cookies.set("additiona_information", additionalInformation, {
      expires: null,
    });
    setIsModalOpenCreate(false);
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
  useEffect(() => {
    const savedSchoolName = Cookies.get("school_name");
    const savedStreetName = Cookies.get("street_name");
    const savedBuildingNumber = Cookies.get("building_number");
    const savedPhoneNumber = Cookies.get("phone_number");
    const savedAdditionalInformation = Cookies.get("additional_information");

    if (savedSchoolName) {
      setSchoolName(savedSchoolName);
    }
    if (savedStreetName) {
      setStreetName(savedStreetName);
    }
    if (savedBuildingNumber) {
      setBuildingNumber(savedBuildingNumber);
    }
    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber);
    }
    if (savedAdditionalInformation) {
      setAdditionalInformation(savedAdditionalInformation);
    }
  }, []);

  const postNewRecord = async (e) => {
    e.preventDefault();
    const dataToPost = {
      schoolName: { schoolName },
      streetName: { streetName },
      buildingNumber: { buildingNumber },
      phoneNumber: { phoneNumber },
      additionalInformation: { additionalInformation },
    };
    try {
      const response = await api.post(URL_POST, dataToPost);
      if (response.status === 200) {
        setErrMsg("Pomyślnie dodano nowy rekord");
        handleCloseModalCreate();
        handleOpenModalMsg();
      }
    } catch (err) {
      if (err.response) {
        setErrMsg(
          `Brak możliwości dodania nowego rekoru, sprawdź czy taki juz nie istnieje i spróbuj ponownie ${err}`
        );
      } else if (err.request) {
        setErrMsg("Bład połączenia, spróbuj ponownie za jakiś czas");
      }
      handleCloseModalCreate();
      handleOpenModalMsg();
    }
  };

  const deleteRecords = async (e) => {
    e.preventDefault();
    if (idToDelete.idToDelete.length === 0) {
      setErrMsg("Niezaznaczono żadnego rekordu");
      handleCloseModalDelete();
      handleOpenModalMsg();
    } else {
      try {
        const response = await api.delete(URL_DELETE_MANY, {
          data: {
            id: idToDelete.idToDelete,
          },
        });
        if (response.status === 200) {
          setErrMsg("Pomyślnie usuniete żądane rekordy");
          handleCloseModalDelete();
          handleOpenModalMsg();
        }
      } catch (err) {
        if (err.response) {
          setErrMsg("Nie można usunąć rekordów spróbuj ponownie później");
          handleCloseModalDelete();
          handleOpenModalMsg();
        } else if (err.request) {
          setErrMsg("Błąd połączenia, spróbuj ponownie za jakiś czas");
          handleCloseModalDelete();
          handleOpenModalMsg();
        }
      }
    }
  };

  const handleSearch = (searchCat, e) => {
    let url = "";
    switch (searchCat) {
      case "schoolName":
        url = `../schools/search?${searchCat}=${searchSchoolName}`;
        break;
      case "streetName":
        url = `../schools/search?${searchCat}=${searchStreetName}`;
        break;
      case "buildingNumber":
        url = `../schools/search?${searchCat}=${searchBuildingNumber}`;
        break;
      case "phoneNumber":
        url = `../schools/search?${searchCat}=${searchPhoneNumber}`;
        break;
      default:
        break;
    }
    navigate(url, { replace: true });
    window.location.reload();
  };

  const handleFilterBySchoolName = (e) => {
    let url = "";
    if (!sortSchoolNameAsc && !sortSchoolNameDesc) {
      setSortSchoolNameAsc(true);
      url = `../schools/sortBySchoolNameAsc`;
      navigate(url, { replace: true });
      window.location.reload();
    } else if (sortSchoolNameAsc) {
      setSortSchoolNameAsc(false);
      setSortSchoolNameDesc(true);
      url = `../schools/sortBySchoolNameDesc`;
      navigate(url, { replace: true });
      window.location.reload();
    } else {
      setSortSchoolNameAsc(true);
      setSortSchoolNameDesc(false);
      url = `../schools/sortBySchoolNameAsc`;
      navigate(url, { replace: true });
      window.location.reload();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column action-bar justify-content-between">
          <div className="d-flex flex-row">
            <button onClick={hadleOpenModalCreate} className="action-btn">
              <span>Dodaj Nowe</span>
            </button>
            <button onClick={handleOpenModalDelete} className="action-btn">
              <span className="text">Usuń zaznaczone</span>
            </button>
            <div className="d-flex flex-row">
              <button
                className="text d-flex flex-row action-btn"
                onClick={handleFilterBySchoolName}
              >
                <span className="next-to-sort-text">Nazwa placówki</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon
                    className={sortSchoolNameAsc ? "active" : "not-active"}
                    icon={faSortUp}
                  />
                  <FontAwesomeIcon
                    className={sortSchoolNameDesc ? "active" : "not-active"}
                    icon={faSortDown}
                  />
                </div>
              </button>
              <div className="text d-flex flex-row bg-primary">
                <input
                  className="next-to-sort-text"
                  type="text"
                  onChange={(e) => {
                    setSearchSchoolName(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("schoolName", e)}
                  // search(this.search, "schoolName")}
                  value="schoolName"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <button className="text d-flex flex-row action-btn">
                <span className="next-to-sort-text">Nazwa Ulicy</span>
                <div className="d-flex flex-column">
                  <FontAwesomeIcon className="active" icon={faSortUp} />
                  <FontAwesomeIcon icon={faSortDown} />
                </div>
              </button>
              <div className="text d-flex flex-row bg-primary">
                <input
                  className="next-to-sort-text"
                  type="text"
                  onChange={(e) => {
                    setSearchStreetName(e.target.value);
                  }}
                />
                <button
                  className="text d-flex flex-row action-btn"
                  onClick={(e) => handleSearch("streetName", e)}
                  value="streetName"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row">
            <button className="text d-flex flex-row action-btn">
              <span className="next-to-sort-text">Numer budynku</span>
              <div className="d-flex flex-column">
                <FontAwesomeIcon className="active" icon={faSortUp} />
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </button>
            <div className="text d-flex flex-row bg-primary">
              <input
                className="next-to-sort-text"
                type="number"
                min="0"
                onChange={(e) => {
                  setSearchBuildingNumber(e.target.value);
                }}
              />
              <button
                className="text d-flex flex-row action-btn"
                onClick={(e) => handleSearch("buildingNumber", e)}
                value="buildingNumber"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <button className="text d-flex flex-row action-btn">
              <span className="next-to-sort-text">Numer Telefonu</span>
              <div className="d-flex flex-column">
                <FontAwesomeIcon className="active" icon={faSortUp} />
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </button>
            <div className="text d-flex flex-row bg-primary">
              <input
                className="next-to-sort-text"
                type="number"
                min="111111111"
                onChange={(e) => {
                  setSearchPhoneNumber(e.target.value);
                }}
              />
              <button
                className="text d-flex flex-row action-btn"
                onClick={(e) => handleSearch("phoneNumber", e)}
                value="phoneNumber"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal of creating new records in db */}
      <Modal
        size="lg"
        show={isModalOpenCreate}
        onHide={handleCloseModalCreate}
        aria-labelledby="Dodaj nowy rekord danej kategori"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Dodaj nowy rekord do bazy danych
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={postNewRecord}>
            <label>Nazwa placówki</label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="schoolName"
              required
              onChange={(e) => setSchoolName(e.target.value)}
              value={schoolName}
            />
            <label>Nazwa ulicy</label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="streetName"
              required
              onChange={(e) => setStreetName(e.target.value)}
              value={streetName}
            />
            <label>Numer budynku</label>
            <input
              className="form-control mt-2 mb-2"
              type="number"
              id="buildingNumber"
              required
              onChange={(e) => setBuildingNumber(e.target.value)}
              value={buildingNumber}
            />
            <label>Numer telefonu</label>
            <input
              className="form-control mt-2 mb-2"
              type="number"
              id="phoneNumber"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
            <label>Dodatkowe informacje</label>
            <input
              className="form-control mt-2 mb-2"
              type="text"
              id="additionalInformation"
              required
              onChange={(e) => setAdditionalInformation(e.target.value)}
              value={additionalInformation}
            />
            <button className="btn btn-primary mt-3 mb-2 p-3" id="submit-btn">
              Dodaj
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {/* Modal of deleting items from db */}
      <Modal
        size="lg"
        show={isModalOpenDelete}
        onHide={handleCloseModalDelete}
        aria-labelledby="Usuń zaznaczone z bazy danych"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Usuń rekordy z bazy danych
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={deleteRecords}>
            <label>Czy na pewno chcesz usunąć zaznaczone rekory</label>
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
export default ActionBarSchool;
