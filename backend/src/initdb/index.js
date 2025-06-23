const initdata = require("./data");
const dotenv = require("dotenv")
const Question = require("../models/questions");
dotenv.config();

const main = require("./connectDb");
main();


const initDb = async () => {
let data = await Question.insertMany(initdata.data);
  console.log("data was initilize",data);
};
initDb();
