import express from "express";
import { corsConfig } from "./config/cors";

const app = express();

app.use(corsConfig);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

export default app;

