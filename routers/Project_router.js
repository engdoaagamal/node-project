const Project=require("../controllers/Project_controller");
const routers=require("express").Router();
//const { verifyTocken}=require("../middelware/verifytocken")
routers.post ("/createProject",Project.createProject);
routers.get ("/getAllProjects",Project.getAllProjects);
routers.get("/getoneProjectbyid/:id", Project.getoneProjectbyid);

routers.get ("/getstatusProjectbyid/:id",Project.get_statusProjectbyid);
routers.get("/getallbyinstructorid/:id", Project.getall_by_instructor_id);

routers.get("/getallbystdid/:id", Project.getall_by_std_id);//not test 
routers.get("/getonebytaskid/:id", Project.get_one_by_task_id);// not test

routers.put("/updateProject/:id",Project.updateProject)
routers.delete("/deleteProject/:id",Project.deleteProjectbyid)


module.exports=routers
