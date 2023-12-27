import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: "http://localhost:9200" });

const searchResponse = await client.search({
	index: "movies",
	body: {
		sort: [{ popularity: "desc" }], // 透過 popularity 欄位進行排序
	},
});

console.log(searchResponse.hits.hits);
