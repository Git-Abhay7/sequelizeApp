var router = require("express").Router();
var usercontroller = require("../dbController/userController");
var { create } = require("../validator/user");
var { validation } = require("../commonFunction/validation");
router.post("/addUser", [create(), validation], usercontroller.signUp);

module.exports = router;
