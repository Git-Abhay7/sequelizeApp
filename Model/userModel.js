const Sequelize = require("sequelize");
var utils = require("../commonFunction/utils");
var sequelize = require("../dbConnection/connection");

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
    email: {
      type: Sequelize.STRING,
      unique: true,
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
  }, {
    freezeTableName: true,
  }
);
UserModel.sync();

UserModel.SignUp = async (body, res) => {
  try {
    var result = await UserModel.findOne({
      where: {
        email: body.email
      }
   })
   console.log(result.email)
    if (result) {
      if (result.email == body.email) {
        res
          .status(utils.Error_Code.AlreadyExist)
          .send(utils.Error_Message.EmailExist);
      }
    }
  } catch (error) {
    throw error;
  }

}

module.exports = UserModel;