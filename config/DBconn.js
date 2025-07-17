const mongoose = require("mongoose");

const DBconn = async()=>{
      try {
        await mongoose.connect(process.env.MONGO_URI);
      } catch (error){
        console.log(error);
      }
}

module.exports = {DBconn};