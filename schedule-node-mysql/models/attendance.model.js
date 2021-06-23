const dateFns = require("date-fns");

const connection = require("../db/connection");

class AttendanceDTO {
  add(attendance) {
    const [day, month, year] = attendance.attendanceDate.split("/");
    const attendanceFormattedDate = new Date(
      Number(year),
      Number(month),
      Number(day)
    );
    const createdDate = new Date();
    const attendanceDate = dateFns.format(
      attendanceFormattedDate,
      "yyyy-MM-dd"
    );

    const payload = { ...attendance, createdDate, attendanceDate };
    const insertAttendance = "INSERT INTO attendance SET ?";

    connection.query(insertAttendance, payload, (error, result) => {
      if (error) {
        throw new Error(error);
      }

      console.log("Attendance inserted", result);
    });
  }
}

module.exports = new AttendanceDTO();
