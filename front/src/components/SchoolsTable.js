import { useState } from "react";
import ModalEditSchool from "./Modals/ModalEditSchool";
import ModalDeleteSchool from "./Modals/ModalDeleteSchool";
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
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const handleOpenModalEdit = () => {
    setModalEditOpen(true);
  };

  const handleOpenModalDelete = () => {
    setModalDeleteOpen(true);
  };

  const handleCheckboxChange = (event) => {
    onCheckboxChange(event.target.value, event.target.checked);
  };

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
      <ModalEditSchool
        modalEditOpen={modalEditOpen}
        setModalEditOpen={setModalEditOpen}
        id={id}
        schoolName={schoolName}
        streetName={streetName}
        buildingNumber={buildingNumber}
        phoneNumber={phoneNumber}
        additionalInformation={additionalInformation}
      />
      <ModalDeleteSchool
        modalDeleteOpen={modalDeleteOpen}
        setModalDeleteOpen={setModalDeleteOpen}
        id={id}
      />
    </>
  );
};

export default SchoolsTable;
