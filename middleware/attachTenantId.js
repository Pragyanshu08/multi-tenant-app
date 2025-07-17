module.exports = (req , res , next)=>{

    let tenantId = req.params.tenantId;
    if(!tenantId){
        return res.status(400).json({error:"missing tanent ID"});
    }

    req.tenantId= tenantId;
    next();
}