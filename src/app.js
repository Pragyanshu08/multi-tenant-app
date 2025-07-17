const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const QRCode = require("qrcode");
require("dotenv").config();
// app.use(express.static(path.join(__dirname, ".." , "public")));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname, ".." , "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const {DBconn} = require(path.join(__dirname, "..", 'config' , "DBconn.js"));
const USER = require(path.join(__dirname, "..", "model" , "userSchema"));
const TENANT = require(path.join(__dirname, '..' , 'model' , "tenantsSchema.js"));
const attachTenantId = require(path.join(__dirname,".." , "middleware" ,"attachTenantId.js"))


app.get("/" , (req, res) => {
    res.send("home page");
})

app.get("/register-tenant" , (req , res)=>{
    res.render("register-tenant");
})

app.post("/register-tenant" , async(req , res)=>{
    const {collegeName} = req.body;

    const tenantId = collegeName.trim().toLowerCase().replace(/\s+/g, '_')+'_'+Date.now();

    const newTenant = new TENANT({ collegeName, tenantId });
    await newTenant.save();

    const  Tlink = `http://localhost:3000/${tenantId}/form`;

    const qr = await QRCode.toDataURL(Tlink);

    res.render("register-success" , {Tlink , qr});

})


app.use("/:tenantId" , attachTenantId)

app.get("/:tenantId/form" , (req ,res)=>{
    res.render("register-student" , {tenantId: req.params.tenantId});
})

app.post("/:tenantId/form" , async(req , res)=>{
    const {name} = req.body;

    const user = new USER({
        name,
        tenantId: req.tenantId,
    });
    await user.save();
    res.send("success");
});

app.get("/:tenantId/get-users" , async(req , res)=>{
    const users = await USER.find({tenantId: req.tenantId});
    res.json({tenantId: req.tenantId , users})
})


DBconn().then(()=>{
    console.log("Database connected");
    app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
  })
})