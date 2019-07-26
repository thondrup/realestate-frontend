import { Client } from 'elasticsearch'
 
export async function search({categories, minArea, maxPrice}) {
  const client = new Client({
    host: 'https://search-estate-i2mq74bcsxvndr5fumr3evo4wi.eu-west-1.es.amazonaws.com'
  });

  const categoryMatches = categories.map(category => {
    return { match: { category: category }};
  });

  const result = await client.search({
    index: 'estate',
    body: {
      size: 1000,
      _source: ["location"],
      query: {
        bool : {
          must: [
            {
              bool: {
                should: categoryMatches
              }
            },
            {
              exists: {
                field: "location"
              }
            },
            {
              range: {
                price: {
                  "lte" : maxPrice
                }
              }
            },
            {
              range: {
                area: {
                  "gte" : minArea
                }
              }
            }
          ]
        }
      }
    }
  });
  
  const hits = result.hits.hits;
  let items = [];
  if(hits.length > 0) {
    items = hits.map(hit => {
      return {
        id: hit._id,
        location: {
          lat: parseFloat(hit._source.location.lat),
          lon: parseFloat(hit._source.location.lon)
        }
      };
    })
  }

  return items;
}

 
export async function getItem(id) {
  const client = new Client({
    host: 'https://search-estate-i2mq74bcsxvndr5fumr3evo4wi.eu-west-1.es.amazonaws.com'
  });

  const result = await client.search({
    index: 'estate',
    body: {
      size: 1,
      query : {
        match:{
          _id: id
        }
      }
    }
  });
  
  const hits = result.hits.hits;

  if(hits.length === 0) {
    return null
  }

  const hit = result.hits.hits[0];

  return {
    id: hit._id,
    address: hit._source.address,
    area: hit._source.area,
    description: hit._source.description,
    link: hit._source.link,
    price: hit._source.price,
    rooms: hit._source.rooms,
    title: hit._source.title,
    images: hit._source.images,
    category: hit._source.category,
    location: {
      lat: parseFloat(hit._source.location.lat),
      lon: parseFloat(hit._source.location.lon)
    }
  };
}