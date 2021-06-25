const dateFns = require("date-fns");

const connection = require("../db/connection");

class AttendanceDTO {
  add(attendance, response) {
    const createdDate = new Date();

    const [day, month, year] = attendance.attendanceDate.split("/");
    const attendanceFormattedDate = new Date(
      Number(year),
      Number(month),
      Number(day)
    );

    const errors = this.checkValidations(
      attendance,
      attendanceFormattedDate,
      createdDate
    ).filter((item) => !item.valid);

    if (errors.length) {
      response.status(400).json(errors);
      return;
    }

    const payload = {
      ...attendance,
      ...this.formatDate(attendance.attendanceDate),
      createdDate,
    };
    const insertAttendance = "INSERT INTO attendance SET ?";

    connection.query(insertAttendance, payload, (error) => {
      if (error) {
        response.status(400).json(error);
        return;
      }

      response.status(201).json(attendance);
    });
  }

  list(response) {
    const listAllAttendance = "SELECT * FROM attendance";

    connection.query(listAllAttendance, (error, result) => {
      if (error) {
        response.status(400).json(error);
        return;
      }

      response.status(200).json(result);
    });
  }

  getById(id, response) {
    const getAttendanceById = `SELECT * FROM attendance WHERE id = ?`;

    connection.query(getAttendanceById, id, (error, result) => {
      if (error) {
        response.status(400).json(error);
        return;
      }

      const [attendance] = result;
      response.status(200).json(attendance);
    });
  }

  update(id, value, response) {
    if (value.attendanceDate) {
      value = {
        ...value,
        ...this.formatDate(value.attendanceDate),
      };
    }

    const updateAttendance = "UPDATE attendance SET ? WHERE id = ?";

    connection.query(updateAttendance, [value, id], (error) => {
      if (error) {
        response.status(400).json(error);
        return;
      }

      response.status(200).json({ ...value, id });
    });
  }

  delete(id, response) {
    const deleteAttendance = "DELETE FROM attendance WHERE id = ?";

    connection.query(deleteAttendance, id, (error) => {
      if (error) {
        response.status(400).json(error);
        return;
      }

      response.status(200).json({ id });
    });
  }

  checkValidations(attendance, attendanceDate, createdDate) {
    const isAttendanceDateValid = dateFns.isAfter(attendanceDate, createdDate);
    const isClientValid = attendance.client.length >= 2;

    return [
      {
        name: "attendanceDate",
        valid: isAttendanceDateValid,
        message: "Attendance date have to be after the creation date",
      },
      {
        name: "client",
        valid: isClientValid,
        message: "Client name have to be at least 2 characters",
      },
    ];
  }

  formatDate(date) {
    const [day, month, year] = date.split("/");
    const attendanceFormattedDate = new Date(
      Number(year),
      Number(month),
      Number(day)
    );
    const attendanceDate = dateFns.format(
      attendanceFormattedDate,
      "yyyy-MM-dd"
    );

    return {
      attendanceDate,
    };
  }
}

module.exports = new AttendanceDTO();
