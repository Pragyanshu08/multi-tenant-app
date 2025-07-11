module.exports = (req , res , next)=>{

    let tanentId = req.params.tanentId;
    if(!tanentId){
        return res.status(400).json({erroe:"missing tanent ID"});
    }

    req.tanentId= tanentId;
    next();
}