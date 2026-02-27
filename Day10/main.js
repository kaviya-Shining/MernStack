let fs = require("fs");
if(!fs.existsSync("./documents")){
    fs.mkdir("./documents",(err) =>{
        if(err){
            console.log(err);
    }else{
        console.log("Folder created successfully");
    }
    });
}

fs.writeFile("hello.txt","HIll",()=>{
    console.log("File created")
})