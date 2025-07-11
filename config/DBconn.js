const mongoose = require("mongoose");

const DBconn = async()=>{
      try {
        await mongoose.connect("mongodb://localhost:27017/multiTanentProject");
      } catch (error){
        console.log(error);
      }
}

module.exports = {DBconn};