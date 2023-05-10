const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

// This API is only for testing purposes
// Mock user data
const users = [
  {
    username: "mariusz",
    password: "Krukidziobia1@",
    admin_rights: 1,
  },
  {
    username: "w1234",
    password: "User1@34",
    admin_rights: 0,
  },
];

const schools = [
  {
    id: 1,
    schoolName: "Lincoln",
    streetName: "Main Street",
    buildingNumber: "123",
    phoneNumber: "884111555",
    additionalInformation: "Near the city park",
  },
  {
    id: 2,
    schoolName: "Parkview High School",
    streetName: "Oak Street",
    buildingNumber: "678",
    phoneNumber: "987111777",
    additionalInformation: "Across from the public library",
  },
  {
    id: 3,
    schoolName: "Eastside Middle School",
    streetName: "Maple Avenue",
    buildingNumber: "456",
    phoneNumber: "123111777",
    additionalInformation: "Adjacent to the city sports complex",
  },
  {
    id: 4,
    schoolName: "Westlake Elementary School",
    streetName: "Pine Street",
    buildingNumber: "789",
    phoneNumber: "546111777",
    additionalInformation: "Behind the shopping center",
  },
  {
    id: 5,
    schoolName: "Northside High School",
    streetName: "Elm Avenue",
    buildingNumber: "234",
    phoneNumber: "567511777",
    additionalInformation: "Near the city center",
  },
];

const routes = [
  {
    id: 1,
    name: "Szalona droga",
    number: 1,
    description: "Suuuuuuuper",
  },
  {
    id: 2,
    name: "Nudna droga",
    number: 2,
    description: "Nuuuuuuda",
  },
];

// Route to validate username
app.get("/validate-username/:username", (req, res) => {
  const { username } = req.params;

  // Check if the username exists in our mock user data
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    res.status(409).send("Username already exists");
  } else {
    res.status(200).send("Username available");
  }
});

// Route to handle user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (user) {
    const comparePassword = await bcrypt.compare(user.password, password);
    if (comparePassword) {
      res.status(200).json({
        status: "success",
        resault: user.lenght,
        user,
      });
    } else {
      res.status(401).send("Invalid username or password");
    }
  } else {
    res.status(401).send("Invalid username or password");
  }
});

app.post("/schools/create-new", async (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: "success",
  });
});

app.get("/schools/id:id", async (req, res) => {
  const id = req.params.id;
  const school = schools.find((school) => school.id === parseInt(id));
  console.log(school);
  res.status(200).json({
    status: "success",
    data: school,
  });
});

// Searching
app.get("/schools/search", async (req, res) => {
  let search = "";
  let data = schools;
  if (req.query.schoolName) {
    search = req.query.schoolName;
    data = data.filter((school) => school.schoolName.includes(search));
  } else if (req.query.streetName) {
    search = req.query.streetName;
    data = data.filter((school) => school.streetName.includes(search));
  } else if (req.query.buildingNumber) {
    search = req.query.buildingNumber;
    data = data.filter((school) => school.buildingNumber.includes(search));
  } else {
    search = req.query.phoneNumber;
    data = data.filter((school) => school.phoneNumber.includes(search));
  }
  res.status(200).json({
    status: "success",
    resault: data.length,
    data,
    szuka: search,
  });
});

// Sorting
app.get("/schools/sortBySchoolNameAsc", async (req, res) => {
  const data = schools;
  data.sort((a, b) => a.schoolName.localeCompare(b.schoolName));
  res.status(200).json({
    status: "success",
    data,
  });
});

app.get("/schools/sortBySchoolNameDesc", async (req, res) => {
  const data = schools;
  data.sort((a, b) => b.schoolName.localeCompare(a.schoolName));
  res.status(200).json({
    status: "success",
    data,
  });
});

app.get("/schools/sortByStreetNameAsc", async (req, res) => {
  const data = schools;
  data.sort((a, b) => a.streetName.localeCompare(b.streetName));
  res.status(200).json({
    status: "success",
    data,
  });
});

app.get("/schools/sortByStreetNameDesc", async (req, res) => {
  const data = schools;
  data.sort((a, b) => b.streetName.localeCompare(a.streetName));
  res.status(200).json({
    status: "success",
    data,
  });
});

app.get("/schools/sortByBuildingNumberAsc", async (req, res) => {
  const data = schools;
  data.sort((a, b) => a.buildingNumber.localeCompare(b.buildingNumber));
  res.status(200).json({
    status: "success",
    data,
  });
});

app.get("/schools/sortByBuildingNumberDesc", async (req, res) => {
  const data = schools;
  data.sort((a, b) => b.buildingNumber.localeCompare(a.buildingNumber));
  res.status(200).json({
    status: "success",
    data,
  });
});

app.get("/schools/sortByPhoneNumberAsc", async (req, res) => {
  const data = schools;
  data.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber));
  res.status(200).json({
    status: "success",
    data,
  });
});

app.get("/schools/sortByPhoneNumberDesc", async (req, res) => {
  const data = schools;
  data.sort((a, b) => b.phoneNumber.localeCompare(a.phoneNumber));
  res.status(200).json({
    status: "success",
    data,
  });
});

app.get("/query", async (req, res) => {
  const query = req.query.schoolName;
  console.log(query);
});

// Delete by specific id
app.delete("/schools/:id", async (req, res) => {
  const id = req.params.id.replace("id", "");
  const school = schools.find((school) => school.id === parseInt(id));
  console.log(school);
  console.log(id);
  res.status(200).json({
    status: "success",
    data: school,
    message: "Deleted successfully",
  });
});

// Delete by many ID
app.delete("/schools", async (req, res) => {
  const ids = req.body.id;
  console.log(ids);
  const result = schools.filter((school) => ids.includes(school.id.toString()));
  // console.log(result);
  if (result.length === 0) {
    res.status(404).json({
      status: "failed",
      data: "Not found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: result,
      message: "Deleted successfully",
    });
  }
});

// No timeout
// app.get("/schools", async (req, res) => {
//   const data = schools;
//   res.status(200).json({
//     status: "success",
//     resault: data.length,
//     data,
//   });
// });

// Timeout for loading porpuse
app.get("/schools", async (req, res) => {
  setTimeout(() => {
    const data = schools;
    data.sort((a, b) => a.id - b.id);
    res.status(200).json({
      status: "success",
      resault: data.length,
      data,
    });
  }, 5000);
});

app.get("/routes", async (req, res) => {
  setTimeout(() => {
    const data = routes;
    data.sort((a, b) => a.id - b.id);
    res.status(200).json({
      status: "success",
      resault: data.length,
      data,
    });
  }, 5000);
});

app.patch("/schools/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  res.status(200).json({
    status: "success",
    data: data,
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
