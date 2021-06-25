const AttendanceDTO = require("../models/attendance.model");

module.exports = (app) => {
  app.get("/attendance", (_, response) => {
    AttendanceDTO.list(response);
  });

  app.get("/attendance/:id", (request, response) => {
    AttendanceDTO.getById(parseInt(request.params.id), response);
  });

  app.post("/attendance", (request, response) => {
    AttendanceDTO.add(request.body, response);
  });

  app.patch("/attendance/:id", (request, response) => {
    AttendanceDTO.update(parseInt(request.params.id), request.body, response);
  });

  app.delete("/attendance/:id", (request, response) => {
    AttendanceDTO.delete(parseInt(request.params.id), response);
  });
};
