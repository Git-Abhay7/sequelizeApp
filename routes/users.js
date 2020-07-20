var router = require("express").Router();
var middleware = require("../Middleware/auth")
var usercontroller = require("../dbController/userController");
var { create, valid, Valid } = require("../validator/user");
var { validation } = require("../commonFunction/validation");
router.post("/addUser", [create(), validation], usercontroller.signUp);
router.post("/login", [valid(), validation], usercontroller.login);
router.post("/address", [Valid(), validation],middleware.TokenVerify, usercontroller.data);
router.get("/getUser/:_id", usercontroller.getUser);


module.exports = router;
