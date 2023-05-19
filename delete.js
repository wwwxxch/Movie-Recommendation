import { Client } from "@elastic/elasticsearch";
const client = new Client({ node: "http://localhost:9200" });

async function deleteIndex(indexName) {
  await client.indices.delete({ index: indexName });
  console.log(`已刪除 ${indexName} index`);
}

deleteIndex(process.argv[2]);
