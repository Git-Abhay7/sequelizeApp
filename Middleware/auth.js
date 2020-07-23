var jwt = require("jsonwebtoken");
var user = require("../model/userModel");
var utils = require("../commonFunction/utils");

module.exports = {
  TokenVerify: async (req, res, next) => {
    try {
      if (!req.headers.token) {
        res
          .status(utils.Error_Code.NotFound)
          .send(utils.Error_Message.Not_Found);
      } else {
        data = await jwt.verify(req.headers.token, "express");
        var User = await user.findOne({
          email: data.email,
        });
        if (!User) {
          res
            .status(utils.Error_Code.NotFound)
            .send(utils.Error_Message.NotExist);
        } else {
          req.User = User;
          next();
        }
      }
    } catch (error) {
      throw error;
    }
  },
};