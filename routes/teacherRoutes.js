const express = require("express");
const jwt = require("jsonwebtoken");
const teacherController = require("../controller/teacherController");
const router = express.Router();
const verify = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.redirect(process.env.HOST + "login");
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
    if (err) {
      res.clearCookie("token");
      return res.redirect(process.env.HOST + "login");
    }
    const { role, id } = decode;
    
    if (role !== "teacher") {
      return res.sendStatus(404);
    }
    req.meta=id;
    next();
  });
};

router
  .get("/", verify, teacherController.redirect)
  .get("/students", verify, teacherController.index)
  .get("/groups", verify, teacherController.groups)
  .post("/addTask", verify, teacherController.addTask);
module.exports = router;