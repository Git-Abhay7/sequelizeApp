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
      check("email").notEmpty().withMessage("Please fill Email field"),
      check("password").notEmpty().withMessage("Please fill Password."),
    ];
  },

  Valid: () => {
    return [
      check("city").notEmpty().withMessage("Please fill city"),
      check("phoneNo").notEmpty().withMessage("Please fill phone Number."),
      check("address").notEmpty().withMessage("Please fill address"),
      check("pinCode").notEmpty().withMessage("Please fill PinCode."),
    ];
  },
};
