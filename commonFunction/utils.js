module.exports.Error_Code = Object.freeze({
    Internal_Error: 500,
    AlreadyExist: 409,
    NotFound: 404,
  });
  
  module.exports.Success_Code = Object.freeze({
    Success: 200,
  });
  
  module.exports.Error_Message = Object.freeze({
    InternalError: "Internal Server Error",
    EmailExist: "Email Already Exist",
    MobileExist: "Mobile Number Already Exist",
    IdExist: "UserId Already Exist.",
  });
  module.exports.Success_Message = Object.freeze({
    SignUp_Successfully: "Thank you, You are successfully SignUp.",
    profileAdded: "User Profile Added Successfully",
  });
  