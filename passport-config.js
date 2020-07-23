// const passport = require("passport");
// var bcrypt = require("bcrypt");
// const Users = require("./Model/userModel");
// const localstrategy = require("passport-local").Strategy;

// module.exports =
//   (console.log("========================>", Users.email),
//   "local-login",
//   new localstrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     function (email, password, done) {
//       Users.findOne({
//         where: {
//           email: email,
//         },
//       })
//         .then(function (users) {
//           console.log("========================");
//           if (!users) {
//             return done(null, false, {
//               message: "Incorrect email.",
//             });
//           }
//           if (bcrypt.compare(password, users.password) == false) {
//             console.log("wrong");

//             return done(null, false, {
//               message: "Incorrect password.",
//             });
//           }
//           return done(null, users);
//         })
//         .catch((err) => done(err));
//     }
//   ));
