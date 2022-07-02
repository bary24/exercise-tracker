const app = require("./app");
const connectMongo = require("./services/mongo");
const http = require("http");
const mongoose = require("mongoose");

const port = process.env.port || 8000;

const server = http.createServer(app);

const startingServerPromise = startServer();
async function startServer() {
  await connectMongo();

  await mongoose.syncIndexes();

  server.listen(port, function () {
    console.log(`working on ${port}`);
  });
}

module.exports = startingServerPromise;
