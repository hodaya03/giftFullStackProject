const { Router } = require("express");
const app = Router();
const { authenticateUser } = require("../BL/fetchUserAndPwd");


//לשאול את המורה איך בודקים שהמשתמש קים בלי שיראו את הסיסמה בכתובת למעלה,
//המורה אמרה לעשות את זה ב post
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const user = await authenticateUser(username, password);
    res.status(200).send(user);
  } catch (error) {
    console.error("Error authenticating user:", error.message);
    res.status(401).send("Authentication failed");
  }
});

app.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
    const { Password, Mail } = req.body;
    insertToTable( "User", "Password, Mail",
                  ` '${Password}', '${Mail}'`
                );
      
      res.status(200).send('User added successfully');
    } catch (error) {
      console.error("Error authenticating user:", error.message);
      res.status(401).send("Authentication failed");
    }
  });


module.exports = app;
