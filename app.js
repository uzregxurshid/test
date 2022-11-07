const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const publicRoutes = require("./routes/publicRoutes");
const privateRoutes = require("./routes/privateRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();



app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser())
app.use("/", publicRoutes);
app.use("/admin", privateRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student",studentRoutes)
const port = process.env.PORT||9000;

app.listen(port, ()=>{
  console.log(`Server running at the port ${port}`);
});
