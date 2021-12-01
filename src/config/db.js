const mongoose = require("mongoose");

const connectDb = () =>
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((e) => {
      console.log("DB Connection failed", e);
      process.exit(1);
    });

module.exports = connectDb;
