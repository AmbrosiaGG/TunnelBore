const express = require("express")
const router = express.Router()
 
router.get("/", async (req, res) => {
 res.render('../views/login.ejs')
})

module.exports = router