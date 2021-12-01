const app = require("./app");
const { connectDb } = require("./config");

//Connect Database
connectDb();

app.listen(process.env.PORT, () =>
  console.log("Listening to PORT:", process.env.PORT)
);
