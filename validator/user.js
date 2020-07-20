const { check } = require("express-validator");

module.exports = {
  create: () => { 
    return [
      check("firstName").notEmpty().withMessage("Please fill firstName  field"),
      check("email").notEmpty().withMessage("Please fill Email field."),
      check("password")
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage("Please fill password field with atleast length--> 5."),
    ];
  },
  valid: () => {
    return [
      check("user_id").notEmpty().withMessage("Please fill userId field"),
      check("mobileNumber")
        .notEmpty()
        .withMessage("Please fill mobileNumber field."),
      check("dob").notEmpty().withMessage("Please fill dob field.").isISO8601(),
    ];
  },
};
