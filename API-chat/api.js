const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

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
    name: "dwUjka",
    city: "KrakUw",
    street: "Krzywa 10",
    telephone: "887555444",
  },
  {
    id: 2,
    name: "trUjka",
    city: "Wroclaw",
    street: "Jakas tam 12",
    telephone: "777888555",
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
    res.status(200).json({
      status: "success",
      resault: data.length,
      data,
    });
  }, 5000);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
