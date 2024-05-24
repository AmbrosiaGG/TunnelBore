const express = require("express")
const user = require("../database/schema/user.js")
const router = express.Router()
 
router.get("/very_secret_endpoint", async (req, res) => {
 const ducky = await new user(
    {
        name: "ducky",
        password: "ducky"
    }
)
ducky.save()
res.send("failed successfully")
})

router.post("/login", async (req, res) => {
        const userdata = await user.findOne({ name: req.body.name });
        if (!userdata) {
          res.json({
            title: "No user",
            discription: "No user with that password and name",
            icon: "error",
          });
        } else {
          if (req.body.password == userdata.password) {
            req.session.username = userdata.name;
            req.session.not_listd = userdata.password;

            res.json({
              title: "Success",
              discription: "Logged in",
              icon: "success",
            });
          } else {
            res.json({
              title: "Incorrect Credentials",
              discription: "Invalid credentials",
              icon: "error",
            });
          }
        }
})
   

module.exports = router