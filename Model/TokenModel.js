const Sequelize = require("sequelize");
var User = require("../model/userModel");
var utils = require("../commonFunction/utils");
var sequelize = require("../dbConnection/connection");

const tokenModel = sequelize.define(
    "token", {
        _id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        state: {
            type: Sequelize.STRING,
        },
        phoneNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        address: {
            type: Sequelize.STRING,
        },
        pinCode: {
            type: Sequelize.STRING,
        },
    }, {
        hooks: {
            beforeCreate: async function (token, options) {
                var exist = await this.findOne({
                    where: {
                        phoneNo: token.phoneNo,
                    },
                });
                if (exist) {
                    if (exist.phoneNo == token.phoneNo) {
                        throw utils.Error_Message.PhExist;
                    }
                }
            },
        },
    }, {
        freezeTableName: true,
    }
);
tokenModel.sync();

tokenModel.Data = async (body) => {
    try {
        const Save = await tokenModel.create(body);
        return Save;
    } catch (error) {
        throw error;
    }
};
tokenModel.GetUser = async (params) => {
    tokenModel.hasOne(User, {
        as: "userRef",
        foreignKey: "id"
    });

    try {
        var found = await tokenModel.findOne({
            where: {
                _id: params._id,
            },
            include: [{
                model: User,
                as: "userRef",
            }, ],
        });
        return found;
    } catch (error) {
        throw error;
    }
};

module.exports = tokenModel;