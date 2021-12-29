const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to the db"))
  .catch((err) => console.log(err));
