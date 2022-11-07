const customFs = require("../lib/customFs");

class studentController{
  async redirect(req,res){
    try {
        res.redirect("/student/tasks");
    } catch (error) {
      console.log(error);
    }
  }

  async tasks(req,res){
    try {
      const taskFile = new customFs("../data/tasks.json");
      const student = JSON.parse(new customFs("../data/users.json").readFile()).find(student => student.id === req.meta);
      if (student.groupName){
        const tasks = JSON.parse(taskFile.readFile()).filter(task => task.groupId === student.groupName);
        return res.render("studenttasks",{tasks});
      }
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = new studentController();