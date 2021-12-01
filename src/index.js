const app = require("./app");
const { connectDb, connectCloudinary } = require("./config");

//Connect Database
connectDb();
//Connect Cloudinary
connectCloudinary();

app.listen(process.env.PORT, () =>
  console.log("Listening to PORT:", process.env.PORT)
);
