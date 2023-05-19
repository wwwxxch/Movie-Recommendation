import { Client } from "@elastic/elasticsearch";
const client = new Client({ node: "http://localhost:9200" });
const indexName = "movies";
await client.indices.delete({ index: indexName, ignore_unavailable: true });
await client.indices.create({
  index: indexName,
  body: {
    mappings: {
      properties: {
        title: { type: "text", analyzer: "indexing_analyzer" },
        overview: {
          type: "text",
          // analyzer: "indexing_analyzer",
        },
        vote_average: { type: "float" },
        popularity: { type: "float" }, 
        genres: {
          type: "nested",
          properties: {
            id: { type: "integer" },
            name: { type: "text", analyzer: "indexing_analyzer" },
          },
        },
      },
    },
    settings: {
      analysis: {
        analyzer: {
          indexing_analyzer: {
            tokenizer: "whitespace",
            filter: ["lowercase", "edge_ngram_filter"],
          },
          search_analyzer: {
            tokenizer: "whitespace",
            filter: "lowercase",
          },
        },
        filter: {
          edge_ngram_filter: {
            type: "edge_ngram",
            min_gram: 3,
            max_gram: 15,
          },
        },
      },
    },
  },
});
