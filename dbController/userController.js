var User = require("../model/userModel");
const validation = require("../commonFunction/validation");
var utils = require("../commonFunction/utils");

const bcrypt = require("bcrypt");

module.exports = {
  signUp: async (req, res) => {
    var myData = await User.SignUp(req.body, res)
    try {
      const saltRounds = 10;
      var hash = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hash
      var data = await User.create(req.body);
      res
        .status(utils.Success_Code.Success).json({
          data
        })
    } catch (err) {
      return res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError)
    }
  },
};