import { useState, useEffect } from "react";
import api from "../api/login";
import ConnectionError from "../components/ConectionError";
import SchoolsTable from "../components/SchoolsTable";

const URL_SCHOOLS = "/schools";

const Schools = ({ user }) => {
  const [loading, setloading] = useState(false);
  const [data, setData] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(URL_SCHOOLS);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      setErrMsg("Bład połączenia, spróbuj ponownie za jakiś czas");
    }
  };

  if (user) {
    if (!errMsg) {
      return (
        <>
          {data.data.map((school) => (
            <SchoolsTable
              id={school.id}
              name={school.name}
              street={school.street}
              telephone={school.telephone}
              city={school.city}
            />
          ))}
        </>
      );
    } else {
      return <ConnectionError errorMsg={errMsg} />;
    }
  } else
    return (
      <>
        <div>Musisz być zalogowany aby dalej przejść</div>
      </>
    );
};
export default Schools;
