import express from "express";
import dotenv from "dotenv";
import { searchGenres } from "./searchtype.js";
import { searchKey } from "./searchbykey.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ========================================================================

// req.body example
// {
// 	"want": ["Music"],
// 	"notwant": []
// }
app.post("/filterByGenre", async (req, res) => {
	const { want, notwant} = req.body
	const data = await searchGenres(want, notwant);
	return res.json({ data });
});

// req.body example
// {
// 	"key": "Family"
// }
app.post("/filterByKey", async (req, res) => {
	const { key } = req.body
	console.log(key)
	const data = await searchKey(key);
	return res.json({ data });
});

// ========================================================================
app.listen(port, () => {
	console.log(`listenging on port ${port}...`);
});
