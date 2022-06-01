const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT;

const db = process.env.DATABASE_URL;

mongoose.connect(db).then(() => console.log("DB connected sucessfully."));
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
