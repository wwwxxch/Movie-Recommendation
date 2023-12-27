const client = new Client({ node: "http://localhost:9200" });
import { Client } from "@elastic/elasticsearch";

export const searchKey = async function (key) {
	const searchResponse = await client.search({
		index: "movies",
		body: {
			query: {
				multi_match: {
					query: key,
					type: "phrase",
					fields: ["overview", "title"],
				},
			},
			sort: [{ popularity: "desc" }], // 透過 popularity 欄位進行排序
		},
	});
	const hits = searchResponse.hits.hits;
	const mapping = hits.map((data) => {
		return {
			title: data._source.title,
			overview: data._source.overview,
			popularity: data._source.popularity,
			genres: data._source.genres,
		};
	});
	return mapping;
};

// await searchKey(process.argv[2]).then(console.log);
