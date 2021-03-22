const express = require("express")
const mongoose=require("mongoose")
const morgan = require("morgan")
const cors=require("cors")
//routes:
const indexRoutes=require("./routes/indexRoute")
const userRoutes=require("./routes/userRoutes")
const kgRoutes=require("./routes/kgRoutes")
//middleware:
const app=express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
require('dotenv').config()

//endpoints:
app.use("/",indexRoutes)
app.use("/users",userRoutes)
app.use("/kg",kgRoutes)

//connection:
mongoose.connect(process.env.MONGO_ATLAS,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(() => console.log('connection established'))
  .catch((err)=>console.log(err));


//ERROR HANDLING:
app.use((req,res,next)=>{
  let error=new Error("no matching routes found")
  error.status=404
  next(error)
})

//UNIVERSAL ERROR HANDLING:
app.use((err,req,res,next)=>{
  res.status(err.status||500)
  res.send({success:false,message:err.message})
})


app.listen(4000||process.env.PORT, ()=>console.log("server is running"))