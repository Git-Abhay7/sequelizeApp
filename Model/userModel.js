const Sequelize = require("sequelize");
var utils = require("../commonFunction/utils");
var sequelize = require("../dbConnection/connection");
const bcrypt = require("bcrypt");

const UserModel = sequelize.define(
  "USER", {
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
  }, {
    hooks: {
      beforeCreate: async function (USER, Options) {

        var result = await this.findOne({
          where: {
            email: USER.email,
          },
        });

        if (result) {
          if (result.email == USER.email) {

            throw (utils.Error_Message.EmailExist);
          }

        }
      },
    },
  }, {
    freezeTableName: true,
  }
);
UserModel.sync();

UserModel.SignUp = async (body, res) => {
  try {
    const saltRounds = 10;
    var hash = await bcrypt.hash(body.password, saltRounds);
    body.password = hash;
    var data = await UserModel.create(body);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = UserModel;