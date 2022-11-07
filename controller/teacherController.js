const customFs = require("../lib/customFs");

class teacherController{

  async redirect(req,res){
      try { 
          res.redirect("/teacher/students");
      } catch (error) {
        console.log(error);  
      }
    }
  
    async index(req,res){
      try {
        const usersFile = new customFs("../data/users.json");
        const students = JSON.parse(usersFile.readFile()).filter(user => user.role === "student");
        res.render("teacherindex", {students});
      } catch (error) {
        console.log(error);
      }
    }

    async groups(req,res){
      try {
        const groupsFile = new customFs("../data/groups.json");
        const groups = JSON.parse(groupsFile.readFile()).filter(group => group.teacherId === req.meta);
        res.render("teachergroups", {groups});
      } catch (error) {
        console.log(error);
      }
    }
    async addTask(req,res){
      try {
        const {group, name, description, deadline,status} = req.body;
        if(group && name && description && deadline && status){
          const tasksFile = new customFs("../data/tasks.json");
          const tasks = JSON.parse(tasksFile.readFile());
          const newTask = {
            id: tasks.length + 1,
            groupId: group,
            name,
            description,
            deadline,
            status
          };
          tasks.push(newTask);
          tasksFile.WriteFile(tasks);
          res.redirect("/teacher/groups");
        }
        else  res.sendStatus(404);
      } catch (error) {
        console.log(error);
      }
    }
}


module.exports = new teacherController();