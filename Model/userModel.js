const Sequelize = require("sequelize");
var utils = require("../commonFunction/utils");
var sequelize = require("../dbConnection/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = sequelize.define(
  "USER",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    email: {
      type: Sequelize.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async function (USER, Options) {
        var result = await this.findOne({
          where: {
            email: USER.email,
          },
        });
        if (result) {
          if (result.email == USER.email) {
            throw utils.Error_Message.EmailExist;
          }
        }
      },
    },
  },
  {
    freezeTableName: true,
  }
);
UserModel.sync();

(UserModel.SignUp = async (body, res) => {
  try {
    const saltRounds = 10;
    var hash = await bcrypt.hash(body.password, saltRounds);
    body.password = hash;
    var data = await UserModel.create(body);
    return data;
  } catch (error) {
    throw error;
  }
}),
  (UserModel.LogIn = async (body, res) => {
    try {
      var fetch = await UserModel.findOne({
        where: {
          email: body.email,
        },
      });
      if (fetch) {
        var plain = await bcrypt.compare(body.password, fetch.password);
        if (plain == true) {
          var token = jwt.sign(
            {
              email: body.email,
            },
            "express",
            {
              expiresIn: 60 * 60,
            }
          );
          return token;
        } else {
          return false;
        }
      } else {
        res
          .status(utils.Error_Code.NotFound)
          .send(utils.Error_Message.NotExist);
      }
    } catch (error) {
      throw error;
    }
  });

module.exports = UserModel;
