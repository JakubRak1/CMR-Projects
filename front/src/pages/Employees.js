import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/apiConfig";
import ConnectionError from "../components/ConectionError";
import EmployeesTable from "../components/EmployeesTable";
import LoadingIcon from "../components/LoadingIcon";
import ActionBarEmployess from "../components/ActionBarEmployees";
import "../static/styles/schools.css";

const Employees = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);

  const location = useLocation();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(
        location.pathname + window.location.search
      );
      if (response.status === 200) {
        setIsLoading(false);
        setData(response.data);
      }
    } catch (err) {
      setIsLoading(false);
      setErrMsg("Bład połączenia, spróbuj ponownie za jakiś czas");
    }
  };

  const handleIdDeleteChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  // Check for user login
  if (user) {
    // Check for connection
    if (!errMsg) {
      if (isLoading) {
        return <LoadingIcon />;
      } else {
        return (
          <section>
            <ActionBarEmployess idToDelete={selectedIds} />
            <div className="d-flex justify-content-center mt-5">
              <table className="table table-content">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Imie</th>
                    <th scope="col">Nazwisko</th>
                    <th scope="col">Zespół</th>
                    <th scope="col">Opcje</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((employee) => (
                    <EmployeesTable
                      key={employee.id}
                      id={employee.id}
                      name={employee.name}
                      surname={employee.surname}
                      team={employee.team}
                      onCheckboxChange={handleIdDeleteChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      }
    } else {
      return (
        <>
          {isLoading ? <LoadingIcon /> : <ConnectionError errorMsg={errMsg} />}
        </>
      );
    }
  } else
    return (
      <ConnectionError errorMsg={"Musisz być zalogowany aby przejść dalej"} />
    );
};
export default Employees;
