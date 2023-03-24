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
    password: "krukidziobia",
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
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } else {
    res.status(401).send("Invalid username or password");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
