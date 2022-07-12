import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/cool", (req, res, next) => {
  res.send("You're so cool");
});

export default router;
