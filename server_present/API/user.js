const { Router } = require("express");
const app = Router();
const bodyParser = require("body-parser");
const { authenticateUser } = require("../BL/fetchUserAndPwd");
const { insertToTable } = require("../BL/insertToTable");
const { fetchDataFromTableCondition } = require("../BL/selectCondition");

app.use(bodyParser.json());

//לשאול את המורה איך בודקים שהמשתמש קים בלי שיראו את הסיסמה בכתובת למעלה,
//המורה אמרה לעשות את זה ב post
app.post("/login", async (req, res) => {
  console.log("req.params", req.body);
  const { username, password } = req.body;
  console.log("username", username);
  console.log("password", password);

  try {
    // console.log("hi");
    const user = await authenticateUser(username, password);
    res.status(200).send(user);
  } catch (error) {
    console.error("Error authenticating user:", error.message);
    res.status(401).send("Authentication failed");
  }
});

app.post("/signup", async (req, res) => {
  const { parameters } = req.body;
  const email = parameters[0];
  const password = parameters[1];
  console.log("hi2");

  console.log(req.body);
  console.log("username", req.body.email);
  console.log("password", req.body.password);
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
      insertToTable("User", "Mail, Password", parameters);

      // insertToTable("User", "Mail, Password", `${email},${password}`);
      res.status(200).json({ message: "User added successfully" });
      console.log("status", "User added successfully");
    } else {
      console.error("User already exsist ");
      res.status(409).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
    console.log("status", "Authentication failed");
  }
});

app.get("/user/:name", async (req, res) => {
  try {
    const userName = req.params.name;
    // console.log('userName', userName);
    const user = await fetchDataFromTableCondition("User", "Mail", userName);
    if (!user || user.length === 0) {
      res.status(401).send("User not found.");
    } else {
      const userId = user[0].Id;
      console.log("userId", userId);
      res.status(200).json({ message: user[0].Id });
    }
  } catch (error) {
    console.error("Error finding user:", error.message);
    res.status(401).send("Finding User failed");
  }
});

module.exports = app;
