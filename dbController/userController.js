var User = require("../model/userModel");
const TOKEN = require("../Model/TokenModel");
const validation = require("../commonFunction/validation");
var utils = require("../commonFunction/utils");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const axios = require("axios");
const colors = require("colors");

module.exports = {
  signUp: async (req, res) => {
    var myData = await User.SignUp(req.body, res);
    try {
      res.status(utils.Success_Code.Success).json({
        myData,
      });
    } catch (err) {
      return res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  login: async (req, res) => {
    var result = await User.LogIn(req.body, res);

    try {
      if (result == false) {
        res
          .status(utils.Error_Code.NotMatch)
          .send(utils.Error_Message.InvalidLogin);
      } else {
        res
          .status(utils.Success_Code.Success, utils.Success_Message.Login)
          .send({
            token: result,
          });
      }
    } catch (error) {
      return res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  data: async (req, res) => {
    const Result = await TOKEN.Data(req.body);
    try {
      res.status(utils.Success_Code.Success).json({
        Result,
      });
    } catch (error) {
      return res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  getUser: async (req, res) => {
    const fetched = await TOKEN.GetUser(req.params);
    try {
      res.status(utils.Success_Code.Success).json({
        fetched,
      });
    } catch (error) {
      return res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },

  flipkartFetch: async () => {
    const body = {
      a: 1,
    };
    //   fetch(
    //     "https://www.flipkart.com/search?q=mobiles&sid=tyy%2C4io&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_7_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_7_na_na_na&as-pos=1&as-type=HISTORY&suggestionId=mobiles%7CMobiles&requestId=c101808f-c71a-4609-b769-69471c4e9b5a",
    //     {
    //       method: "post",
    //       body: JSON.stringify(body),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //     .then((res) => res.text())
    //     .then((Result) => console.log(Result));
  },
  snapdealFetch: () => {
    const body = {
      a: 1,
    };
    fetch(
      "https://www.snapdeal.com/search?keyword=tshirts&santizedKeyword=&catId=&categoryId=0&suggested=false&vertical=&noOfResults=20&searchState=&clickSrc=go_header&lastKeyword=&prodCatId=&changeBackToAll=false&foundInAll=false&categoryIdSearched=&cityPageUrl=&categoryUrl=&url=&utmContent=&dealDetail=&sort=rlvncy/post",
      {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.text())
      .then((json) => console.log(json));
  },

  Urls: (req, res) => {
    axios
      .get(
        "https://www.flipkart.com/search?q=mobiles&sid=tyy%2C4io&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_7_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_7_na_na_na&as-pos=1&as-type=HISTORY&suggestionId=mobiles%7CMobiles&requestId=c101808f-c71a-4609-b769-69471c4e9b5a"
      )
      .then((result) => {
        const $ = cheerio.load(result.data);
        const name = $(
          'div[class="col col-7-12"]> div[class="_3wU53n"]'
        ).text();
        res.send(name.blue);
      });
  },
};
