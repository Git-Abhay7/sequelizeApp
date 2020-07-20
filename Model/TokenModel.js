const Sequelize = require("sequelize");
var utils = require("../commonFunction/utils");
var sequelize = require("../dbConnection/connection");

const tokenModel = sequelize.define("token", {
    user_id: {
        type: Sequelize.STRING

    },
    address: [{
        Address: {
            type: Sequelize.STRING
        }
    }],
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    pinCode: {
        type: Sequelize.INTEGER
    },
    phoneNo: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
}
);