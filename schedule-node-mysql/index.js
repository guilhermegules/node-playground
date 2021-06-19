const server = require("./config/express-config");
const connection = require("./db/connection");

connection.connect((error) => {
  if (error) {
    console.log("MySQL connection error", error);
  } else {
    console.log("Sucessfuly connected");
  }
});

server.listen(process.env.API_PORT, () => {
  console.log(
    `Server is running on port http://localhost:${process.env.API_PORT}`
  );
});
