var router = require("express").Router();
var usercontroller = require("../dbController/userController");
var { create,valid } = require("../validator/user");
var { validation } = require("../commonFunction/validation");
router.post("/addUser", [create(), validation], usercontroller.signUp);
router.post("/login", [valid(), validation], usercontroller.login);


module.exports = router;
