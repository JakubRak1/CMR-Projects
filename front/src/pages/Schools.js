import { useState, useEffect } from "react";
import api from "../api/login";
import ConnectionError from "../components/ConectionError";
import SchoolsTable from "../components/SchoolsTable";
import LoadingIcon from "../components/LoadingIcon";
import ActionBar from "../components/ActionBar";

const URL_SCHOOLS = "/schools";

const Schools = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(URL_SCHOOLS);
      if (response.status === 200) {
        setIsLoading(false);
        setData(response.data);
      }
    } catch (err) {
      setIsLoading(false);
      setErrMsg("Bład połączenia, spróbuj ponownie za jakiś czas");
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
          <>
            <ActionBar />
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Nazwa</th>
                  <th scope="col">Miasto</th>
                  <th scope="col">Ulica</th>
                  <th scope="col">Telefon</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((school) => (
                  <SchoolsTable
                    id={school.id}
                    name={school.name}
                    street={school.street}
                    telephone={school.telephone}
                    city={school.city}
                  />
                ))}
              </tbody>
            </table>
          </>
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
      <>
        <div>Musisz być zalogowany aby dalej przejść</div>
      </>
    );
};
export default Schools;
