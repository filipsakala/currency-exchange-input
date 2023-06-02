import express from "express";

import exchangeRates from "./routes/exchangeRates";

const app = express();
const port = 3200;

app.use("/exchange-rates", exchangeRates);

app.listen(port, () => {
  console.log(`😻 Exchange Rates server app listening on port ${port}`);
});
