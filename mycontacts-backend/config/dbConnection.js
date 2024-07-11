const mongoose = require("mongoose");

const connectionDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "DB Connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    // console.log(err); 
    process.exit(1);
  }
};

module.exports = connectionDb;
