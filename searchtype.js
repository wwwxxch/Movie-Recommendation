/* eslint-disable consistent-return */
import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: "http://localhost:9200" });

export const searchGenres = async function (genres, excludeGenres) {
  try {
    const body = await client.search({
      index: "movies",
      body: {
        query: {
          bool: {
            must:
              genres.length > 0
                ? genres.map((genre) => ({
                    nested: {
                      path: "genres",
                      query: {
                        match: {
                          "genres.name": {
                            query: genre,
                            fuzziness: "AUTO",
                          },
                        },
                      },
                    },
                  }))
                : [],
            must_not:
              excludeGenres && excludeGenres.length > 0
                ? excludeGenres.map((excludeGenre) => ({
                    nested: {
                      path: "genres",
                      query: {
                        match: {
                          "genres.name": {
                            query: excludeGenre,
                            fuzziness: "AUTO",
                          },
                        },
                      },
                    },
                  }))
                : [],
          },
        },
        sort: [{ popularity: "desc" }],
      },
    });
    const hits = body.hits.hits;
    const mapping = hits.map((data) => {
      return {
        title: data._source.title,
        overview: data._source.overview,
        popularity: data._source.popularity,
        genres: data._source.genres,
      };
    });
    return mapping;
  } catch (err) {
    console.error(err);
  }
};

// searchGenres(["Romance"], ["Come"]).then(console.log);
// searchGenres([process.argv[2]], [process.argv[3]]).then(console.log);
