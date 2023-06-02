import express from "express";

const app = express();
const port = 3200;

app.get("/", (req, res) => {
  res.send("Fero World!");
});

app.listen(port, () => {
  console.log(`😻 Exchange Rates server app listening on port ${port}`);
});
