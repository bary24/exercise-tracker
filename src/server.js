const app = require("./app");
const connectMongo = require("./services/mongo");
const http = require("http");
const { Exercise } = require("./models/exercises");
const Month = require("./models/months");
const { Day } = require("./models/days");

const port = process.env.port || 8000;

const server = http.createServer(app);

const startingServerPromise = startServer();
async function startServer() {
  await connectMongo();
  await Exercise.syncIndexes();
  await Day.syncIndexes();
  await Month.syncIndexes();

  server.listen(port, function () {
    console.log(`working on ${port}`);
  });
}

module.exports = startingServerPromise;
