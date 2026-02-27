let mongoose=require("mongoose")

//mongoose is a library for node js,which will help us to connect with the backendl


let connectDB=async()=>{
    try{

       await  mongoose.connect("mongodb://localhost:27017/steve")
       console.log("Database connected successfully🔥")

    }

    catch(err){
        console.log(err.message);
    }
}

module.exports=connectDB;