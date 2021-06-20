const AttendanceDTO = require("../models/attendance.model");

module.exports = (app) => {
  app.get("/attendance", (_, response) => {
    response.send("First get :D");
  });

  app.post("/attendance", (request, response) => {
    AttendanceDTO.add(request.body);

    response.status(201).send(request.body);
  });
};
