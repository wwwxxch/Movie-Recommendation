Forked from https://github.com/Jason082666/Movie-recommendation

1. Start ElasticSearch

```
docker-compose up -d
```

2. Create index in ElasticSearch

```
node create.js
```

3. Crawl data and save it to DB

```
node crawldata.js
```

4. Start app

```
node index.js
```
