require("dotenv").config();
const mongoose=require("mongoose")
const express=require("express")
const app=express();
app.use(express.json());
const port =process.env.PORT||5000
async function connectDB(){
try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoose connect")
} catch (error) {
    console.log("error to connect",error)
}
 
}
connectDB()
app.get("/api",(req,res)=>{
    console.log("welcome to test");
   res.status(200).json({
    msg:"welcome"
   })
})

/////////
const  cors =require("cors");

app.use(cors(
    {origin: "http://localhost:5173"}
));

app.use("/uploads", express.static("uploads"));
////////////////
app.use(express.json());
const studentrouters=require("./routers/student_routera");
app.use("/api",studentrouters);

const instructorRouters = require("./routers/instructor_routers"); 
app.use("/api", instructorRouters);

const projectRouters = require("./routers/Project_router"); 
app.use("/api", projectRouters);

const taskRouters = require("./routers/Task_router"); 
app.use("/api", taskRouters);
app.listen(port,()=>{
    console.log("server run")
}) 