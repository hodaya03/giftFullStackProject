const { Router } = require("express");
const app = Router();
const bodyParser = require("body-parser");
const { authenticateUser } = require("../BL/fetchUserAndPwd");
const { insertToTable } = require("../BL/insertToTable");
const { fetchDataFromTableCondition } = require("../BL/selectCondition");
// const { authenticateToken } = require("../BL/authenticateToken");
const jwt = require("jsonwebtoken");

const secretKey = "myVerySecretAndComplexKey123!";

app.use(bodyParser.json());

// Token Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401); // If there's no token, return 401 Unauthorized

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // If the token is invalid or expired, return 403 Forbidden
    req.user = user; // Attach the user object to the request
    next(); // Call the next middleware/route handler
  });
}

app.post("/login", async (req, res) => {
  // console.log("req.params", req.body);
  const { username, password } = req.body;
  // console.log("username", username);
  // console.log("password", password);

  try {
    // console.log("hi");
    const user = await authenticateUser(username, password);
    // If authentication is successful, generate a token
    if (user) {
      const token = jwt.sign({ id: user.Id, username: user.Mail }, secretKey, {
        expiresIn: "1h",
      });
      console.log("User authenticated:", user);
      // res.json({ message: 'Login successful' });

      res.status(200).json({ token, userId: user.Id });
      // console.log('res.status()', res.status());
      // res.status(200).send(user);
    } else {
      console.log("Authentication failed for user:", username);
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/Signup", async (req, res) => {
  const { email, password } = req.body;

  // const { parameters } = req.body;
  // const email = parameters[0];
  // const password = parameters[1];
  // console.log("hi2");

  // console.log(req.body);
  // console.log("username", req.body.email);
  // console.log("password", req.body.password);
  try {
    // const { email, password } = req.body;
    // const myUser = await fetchDataFromTableCondition(
    //   "User",
    //   "Mail",
    //   `${email}`
    // );
    const myUser = await fetchDataFromTableCondition("User", "Mail", email);

    console.log("myUser", myUser);
    console.log("myUser.length", myUser.length);
    if (myUser.length == 0) {
      const parameters = [email, password];
      await insertToTable("User", "Mail, Password", parameters);

      // Fetch the user again to get the ID (assuming `fetchDataFromTableCondition` returns the user with the ID)
      const newUser = await fetchDataFromTableCondition("User", "Mail", email);
      const userId = newUser[0].Id;

      // Generate the token
      const token = jwt.sign({ id: userId, email }, secretKey, {
        expiresIn: "1h",
      });

      // insertToTable("User", "Mail, Password", `${email},${password}`);
      res.status(200).json({ message: "User added successfully", token, userId });
      console.log("status", "User added successfully");
    } else {
      console.error("User already exsist ");
      res.status(409).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
    // console.log("status", "Authentication failed");
  }
});

app.get("/user/:name", authenticateToken, async (req, res) => {
  try {
    const userName = req.params.name;
    // console.log('userName', userName);
    const user = await fetchDataFromTableCondition("User", "Mail", userName);
    if (!user || user.length === 0) {
      res.status(401).send("User not found.");
    } else {
      const userId = user[0].Id;
      // console.log("userId", userId);
      // res.status(200).json({ message: user[0].Id });
      res.status(200).json({ message: userId });
    }
  } catch (error) {
    console.error("Error finding user:", error.message);
    res.status(401).send("Finding User failed");
  }
});

module.exports = app;
