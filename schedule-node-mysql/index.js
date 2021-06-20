const server = require("./config/express-config");
const connection = require("./db/connection");
const Tables = require("./db/tables");

connection.connect((error) => {
  if (error) {
    throw new Error(`MySQL connection error ${error}`);
  }

  Tables.init(connection);

  server.listen(process.env.API_PORT, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.API_PORT}`
    );
  });
});
