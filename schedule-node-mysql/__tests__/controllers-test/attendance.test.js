const request = require("supertest");
const app = require("../../config/express-config");

describe("attendance controller", () => {
  it("should get the initial message on [/attendance] endpoint", async () => {
    const response = await request(app).get("/attendance").expect(200);

    expect(response.status).toBe(200);

    expect(response.text).toBe("First get :D");
  });
  it("should send any body on [/attendance] endpoint", (done) => {
    request(app)
      .post("/attendance")
      .expect((res) => {
        res.body = {
          client: "client",
          pet: "pet",
          status: "status",
          comments: "comments",
        };
      })
      .expect(
        201,
        {
          client: "client",
          pet: "pet",
          status: "status",
          comments: "comments",
        },
        done
      );
  });
});
