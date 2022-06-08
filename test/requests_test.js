const startServer = require("../src/server");
const assert = require("assert");
const request = require("supertest");
const app = require("../src/app");

describe("testing api integrated with mongodb", () => {
  before(async () => {
    await startServer;
  });

  describe("testing APIs", () => {
    it("getting 200 status code", async () => {
      const response = await request(app).get("/highestMonth");
      assert(response.statusCode === 200);
    });

    it("testing get request returning number of active days", async () => {
      const response = await request(app).get("/activedays/6");
      assert(response.statusCode === 200);
    });

    it("testing post request", async () => {
      const response = await request(app).post("/exercises").send({
        exerciseName: "push-up",
        hours: "1",
        minutes: "30",
      });

      assert(response.statusCode === 201);
    });
  });
});
