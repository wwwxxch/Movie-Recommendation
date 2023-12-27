import express from "express";
import dotenv from "dotenv";
import { searchGenres } from "./searchtype.js";
import { searchKey } from "./searchbykey.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

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

app.listen(port, () => {
	`listenging on port ${port}...`;
});
