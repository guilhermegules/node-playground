class Tables {
  init(connection) {
    this.connection = connection;

    this.createAttendance();
  }

  createAttendance() {
    const createAttendance = `CREATE TABLE IF NOT EXISTS attendance (
        id int NOT NULL AUTO_INCREMENT, 
        client VARCHAR(50) NOT NULL, 
        pet VARCHAR(20), service VARCHAR(20) NOT NULL, 
        status VARCHAR(20) NOT NULL, 
        comments text, 
        PRIMARY KEY(id)
      )`;

    this.connection.query(createAttendance, (error) => {
      if (error) {
        throw new Error(error);
      }
    });
  }
}

module.exports = new Tables();
