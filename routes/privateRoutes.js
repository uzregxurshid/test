const express = require("express");
const jwt = require("jsonwebtoken");
const adminController = require("../controller/adminController");
const router = express.Router();
const verify = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.redirect(process.env.HOST+"login");
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
    if (err) {
      res.clearCookie("token");
      return res.redirect(process.env.HOST+"login");
    }
    const { role, id } = decode;
    if (role !== "admin") {
      return res.sendStatus(404);
    }
    next();
  });
};
router
  .get("/", verify,adminController.redirect)
  .get("/teachers", verify, adminController.teachers)
  .get("/students", verify, adminController.students)
  .get("/groups", verify, adminController.groups)
  .get("/courses", verify, adminController.course)
  
  .post("/deleteTeacher", verify, adminController.deleteTeacher)
  .post("/deleteStudent", verify, adminController.deleteStudent)
  .post("/deleteCourse", verify, adminController.deleteCourse)
  .post("/deleteGroup", verify, adminController.deleteGroup)
  
  .post("/addTeacher", verify, adminController.addTeacher)
  .post("/addStudent", verify, adminController.addStudent)
  .post("/addCourse", verify, adminController.addCourse)
  .post("/addGroup", verify, adminController.addGroup)
  
  .post("/editTeacher", verify, adminController.editTeacher)
  .post("/editStudent", verify, adminController.editStudent)
  .post("/editCourse", verify, adminController.editCourse)
  .post("/editGroup", verify, adminController.editGroup);

module.exports = router;
