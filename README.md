Copied from https://github.com/Jason082666/Movie-recommendation

## Run app in local
1. Start ElasticSearch

```
docker compose up -d
```

2. Create index in ElasticSearch

```
node create.js
```

3. Get TMDB API key and update `.env`

4. Crawl data and save it to DB

```js
# specify the crawling numbers
node crawldata.js 100
```

5. Start app

```
node index.js
```
