const customFs = require("../lib/customFs");

class adminController{
  async redirect(_,res){
    try {
      res.redirect("/admin/teachers");
    } catch (error) {
      console.log(error);
    }
  }
  async teachers(req,res){
    try {
      const usersfile =new customFs("../data/users.json");
      const teachers = JSON.parse(usersfile.readFile()).filter(item=>item.role==="teacher");
       res.render("adminteachers", {teachers});
    } catch (error) {
      console.log(error);
    }
  }
  async students(req,res){
    try {
      const usersfile = new customFs("../data/users.json");
      const students = JSON.parse(usersfile.readFile()).filter(item=>item.role==="student");
      const groupFile = new customFs("../data/groups.json");
      const groups = JSON.parse(groupFile.readFile());
      res.render("adminstudents", {students,groups});
    } catch (error) {
      console.log(error);
    }
  }
  async course(req,res){
    try {
      const courseFile = new customFs("../data/courses.json");
      const courses = JSON.parse(courseFile.readFile());
      res.render("admincourse", {courses});
    } catch (error) {
      console.log(error);
    }
  }
  async groups(req,res){
    try {
      const groupFile = new customFs("../data/groups.json");
      const groups = JSON.parse(groupFile.readFile());
      const usersFile = new customFs("../data/users.json");
      const teachers = JSON.parse(usersFile.readFile()).filter(item=>item.role==="teacher");
      const courseFile = new customFs("../data/courses.json");
      const courses = JSON.parse(courseFile.readFile());
      res.render("admingroups", {groups,teachers,courses});
    } catch (error) {
      console.log(error);
    }
  }
 
  async addTeacher(req,res){
    try {
      const {name,profession,password} = req.body;
      if (name&&profession&&password) {
        const usersfile = new customFs("../data/users.json");
        const users = JSON.parse(usersfile.readFile());
        users.push({
          id: users.length + 1,
          name,
          password,
          role: "teacher",
          profession
        });
        usersfile.WriteFile(users);
       return res.redirect("/admin/teachers");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addStudent(req,res){
    try {
      const {name,password} = req.body;
      if (name&&password) {
        const usersfile = new customFs("../data/users.json");
        const users = JSON.parse(usersfile.readFile());
        users.push({
          id: users.length + 1,
          name,
          password,
          role: "student"
        });
        usersfile.WriteFile(users);
        return res.redirect("/admin/students");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addCourse(req,res){
    try {
      const {name,price,duration} = req.body;
      if (name&&price&&duration) {
        const courseFile = new customFs("../data/courses.json");
        const courses = JSON.parse(courseFile.readFile());
        courses.push({
          id: courses.length + 1,
          name,
          price,
          duration
        });
        courseFile.WriteFile(courses);
        return res.redirect("/admin/courses");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }

    async addGroup(req,res){
        try {
            const {name,course,teacher} = req.body;
            if (name&&course&&teacher) {
                const groupFile = new customFs("../data/groups.json");
                const groups = JSON.parse(groupFile.readFile());
                groups.push({
                    id: groups.length + 1,
                    courseId: course,
                    groupName: name, 
                    teacherId: teacher });
                groupFile.WriteFile(groups);
                return res.redirect("/admin/groups");
            } else {
                return res.sendStatus(404);
            }
        } catch (error) {
          console.log(error);
        }
    }


  async editTeacher(req,res){
    try {
      const {teacher, name, profession, password} = req.body;
      if (teacher&&name&&profession&&password) {

      const usersfile = new customFs("../data/users.json");
      const users = JSON.parse(usersfile.readFile()).map(item=>{
        if(item.id===teacher){
          item.name=name;
          item.profession=profession;
          item.password=password;
        }
        return item;
      });

      usersfile.WriteFile(users);
      
      return res.redirect("/admin/teachers"); }
      else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async editStudent(req,res){
    try {
      const {student, name, password, groups} = req.body;
      if (student&&name&&password&&groups) {

        const usersfile = new customFs("../data/users.json");
        const users = JSON.parse(usersfile.readFile()).map(item=>{
          if(item.id===student){
            item.name=name;
            item.password=password;
            item.groupName=groups;
          }
          return item;
        });
        usersfile.WriteFile(users);
        return res.redirect("/admin/students");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async editCourse(req,res){
    console.log(req.body);
    try {
      const {course, name, price, duration} = req.body;
      if (course&&name&&price&&duration) {
        const courseFile = new customFs("../data/courses.json");
        const courses = JSON.parse(courseFile.readFile()).map(item=>{
          if(item.id===course){
            item.name=name;
            item.price=price;
            item.duration=duration;
          }
          return item;
        });
        courseFile.WriteFile(courses);
        return res.redirect("/admin/courses");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async editGroup(req,res){
    try {
      const {group, name, course, teacher} = req.body;
      if (group&&name&&course&&teacher) {
        const groupFile = new customFs("../data/groups.json");
        const groups = JSON.parse(groupFile.readFile()).map(item=>{
          if(item.id===group){
            item.groupName=name;
            item.courseId=course;
            item.teacherId=teacher;
          }
          return item;
        });
        groupFile.WriteFile(groups);
        return res.redirect("/admin/groups");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }
  



  async deleteTeacher(req,res){
    try {
      const {teacher} = req.body;
      if (teacher) {
        const usersfile = new customFs("../data/users.json");
        const users = JSON.parse(usersfile.readFile()).filter(item=>item.id!=teacher);
        usersfile.WriteFile(users);
        return res.redirect("/admin/teachers");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteStudent(req,res){
    try {
      const {student} = req.body;
      if (student) {
        const usersfile = new customFs("../data/users.json");
        const users = JSON.parse(usersfile.readFile()).filter(item=>item.id!=student);
        usersfile.WriteFile(users);
        return res.redirect("/admin/students");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }


  async deleteCourse(req,res){
    try {
      const {course} = req.body;
      if (course) {
        const courseFile = new customFs("../data/courses.json");
        const courses = JSON.parse(courseFile.readFile()).filter(item=>item.id!=course);
        courseFile.WriteFile(courses);
        return res.redirect("/admin/courses");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteGroup(req,res){
    try {
     
      const {group} = req.body;
      if (group) {
        const groupFile = new customFs("../data/groups.json");
        const groups = JSON.parse(groupFile.readFile()).filter(item=>item.id!=group);
        groupFile.WriteFile(groups);
        return res.redirect("/admin/groups");
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
    }
  }
  

}

module.exports = new adminController();