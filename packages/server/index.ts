import express from "express";
import helmet from "helmet";
import cors from "cors";

import exchangeRates from "./src/routes/exchangeRates.js";

const app = express();
const port = 3200;

app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://stellar-frangollo-11bce5.netlify.app",
    ],
  })
);
app.use("/exchange-rates", exchangeRates);

app.use((_, res, __) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`😻 Exchange Rates server app listening on port ${port}`);
});
