const request = require("supertest");
const app = require("../../config/express-config");

describe("attendance controller", () => {
  it("should get the initial message on [/attendance] endpoint", async () => {
    const response = await request(app).get("/attendance").expect(200);

    expect(response.status).toBe(200);
  });
  it("should send any body on [/attendance] endpoint", (done) => {
    const response = request(app)
      .post("/attendance")
      .send({
        client: "client",
        pet: "pet",
        status: "status",
        comments: "comments",
        attendanceDate: "2021/10/10",
        createdDate: new Date(2021, 10, 9),
      })
      .expect(201, () => {
        done();
      });

    expect(response.url.includes("/attendance")).toBe(true);
    expect(response.method).toBe("POST");
    expect(response.header).toEqual({ "Content-Type": "application/json" });
  });
});
