const SchoolsTable = ({ id, name, city, street, telephone }) => {
  return (
    <tr id={id}>
      <td>{name}</td>
      <td>{city}</td>
      <td>{street}</td>
      <td>{telephone}</td>
      <td>
        <input className="form-check-input" type="checkbox" value="" id={id} />
        <button>usuń</button>
        <button>edytuj</button>
      </td>
    </tr>
  );
};
export default SchoolsTable;
