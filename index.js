import express from "express";
const app = express();
import { searchGenres } from "./searchtype.js";
import { searchKey } from "./searchbykey.js";

app.post("/filterByGenre", async (req, res) => {
  const response = req.body;
  console.log(req.body);
  const data = await searchGenres(response.want, response.notwant);
  res.json({ data });
});

app.post("/filterByKey", async (req, res) => {
  const response = req.body;
  console.log(req.body);
  const data = await searchKey(response.key);
  res.json({ data });
});

app.listen("3100", () => {
  "listenging on port 3100";
});
