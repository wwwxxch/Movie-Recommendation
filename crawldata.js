import axios from "axios";
import dotenv from "dotenv";
import { Client } from "@elastic/elasticsearch";
const client = new Client({ node: "http://localhost:9200" });

dotenv.config();
const API_KEY = process.env.TMDB_API_KEY;

async function saveMoviesToElasticsearch(index) {
	const indexName = "movies";
	// 爬取電影 API 資料
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${index}?api_key=${API_KEY}`
		);
		const results = response.data;

		// 將資料轉換成 Elasticsearch 的格式
		const moviedata = {
			title: results.title,
			overview: results.overview,
			vote_average: results.vote_average,
			popularity: results.popularity,
			genres: results.genres,
		};
		console.log(moviedata);
		const addIntoResponse = await client.index({
			index: indexName,
			body: moviedata,
		});

		await client.indices.refresh({ index: indexName });
		if (addIntoResponse.errors) {
			console.log("存入 Elasticsearch 發生錯誤：", addIntoResponse.errors);
		}
	} catch (e) {
		console.log("not found!");
	}
}

for (let i = 1; i <= process.argv[2]; i++) {
	await saveMoviesToElasticsearch(i);
}
