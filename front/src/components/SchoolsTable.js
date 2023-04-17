const SchoolsTable = ({ id, name, city, street, telephone }) => {
  return (
    <div id={id}>
      name = {name}, city = {city}, street = {street}, telephone = {telephone}
    </div>
  );
};
export default SchoolsTable;
