const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const QRCode = require("qrcode");

// app.use(express.static(path.join(__dirname, ".." , "public")));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname, ".." , "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const {DBconn} = require(path.join(__dirname, "..", 'config' , "DBconn.js"));
const USER = require(path.join(__dirname, "..", "model" , "userSchema"));
const TANENT = require(path.join(__dirname, '..' , 'model' , "tanentsSchema.js"));
const attachTanentId = require(path.join(__dirname,".." , "middleware" ,"attachTanentId.js"))

app.get("/register-tanent" , (req , res)=>{
    res.render("register-tanent");
})

app.post("/register-tanent" , async(req , res)=>{
    const {collegeName} = req.body;

    const tanentId = collegeName.trim().toLowerCase().replace(/\s+/g, '_')+'_'+Date.now();

    const newTanent = new TANENT({ collegeName, tanentId });
    await newTanent.save();

    const  Tlink = `http://localhost:3000/${tanentId}/form`;

    const qr = await QRCode.toDataURL(Tlink);

    res.render("register-success" , {Tlink , qr});

})


app.use("/:tanentId" , attachTanentId)

app.get("/:tanentId/form" , (req ,res)=>{
    res.render("register-student" , {tanentId: req.params.tanentId});
})

app.post("/:tanentId/form" , async(req , res)=>{
    const {name} = req.body;

    const user = new USER({
        name,
        tanentId: req.tanentId,
    });
    await user.save();
    res.send("success");
});

app.get("/:tanentId/get-users" , async(req , res)=>{
    const users = await USER.find({tanentId: req.tanentId});
    res.json({tanentId: req.tanentId , users})
})


DBconn().then(()=>{
    console.log("Database connected");
    app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
  })
})