import express from "express";
import getExchangeRates from "../api/getExchangeRates.js";
import { ParseError } from "../types/errors.js";

const router = express.Router();

router.get("/", async (_, res) => {
  console.log(new Date().toJSON(), "/exchange-rates");

  try {
    const rates = await getExchangeRates();

    res.status(200).json(rates);
  } catch (error) {
    const errorType =
      error instanceof ParseError ? "PARSE_ERROR" : "GENERAL_ERROR";
    console.error(error);
    res.status(500).json({ error: errorType, code: "42" });
  }
});

export default router;
