const connection = require("../db/connection");

class AttendanceDTO {
  add(attendance) {
    const insertAttendance = "INSERT INTO attendance SET ?";

    connection.query(insertAttendance, attendance, (error, result) => {
      if (error) {
        throw new Error(error);
      }

      console.log("Attendance inserted", result);
    });
  }
}

module.exports = new AttendanceDTO();
