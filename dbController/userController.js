var User = require("../model/userModel");
const TOKEN = require("../Model/TokenModel");
const validation = require("../commonFunction/validation");
var utils = require("../commonFunction/utils");
const {
  TokenExpiredError
} = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res) => {
    var myData = await User.SignUp(req.body, res);
    try {
      res.status(utils.Success_Code.Success).json({
        myData,
      });
    } catch (err) {
      return res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  login: async (req, res) => {
    var result = await User.LogIn(req.body, res);
    try {
      if (result == false) {
        res
          .status(utils.Error_Code.NotMatch)
          .send(utils.Error_Message.InvalidLogin);
      } else {
        res
          .status(utils.Success_Code.Success, utils.Success_Message.Login)
          .send({
            token: result,
          });
      }
    } catch (error) {
      return res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  data: async (req, res) => {
    const Result = await TOKEN.Data(req.body);
    try {
      res.status(utils.Success_Code.Success).json({
        Result
      });
    } catch (error) {
      return res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  getUser: async (req, res) => {
    const fetched = await TOKEN.GetUser(req.params);
    try {
      res.status(utils.Success_Code.Success).json({
        fetched
      });
    } catch (error) {
      return res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
};