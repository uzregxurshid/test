const express = require("express");
const jwt = require("jsonwebtoken");
const studentController = require("../controller/studentController");
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

    if (role !== "student") {
      return res.sendStatus(404);
    }
    req.meta = id;
    next();
  });
};

router
  .get("/", verify, studentController.redirect)
  .get("/tasks", verify, studentController.tasks);
module.exports = router;
