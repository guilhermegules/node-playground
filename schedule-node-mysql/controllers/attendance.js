module.exports = (app) => {
  app.get("/attendance", (request, response) => {
    response.send("First get :D");
  });

  app.post("/attendance", (request, response) => {
    response.send(request.body);
  });
};
