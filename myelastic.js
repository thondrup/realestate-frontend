import { Client } from 'elasticsearch'
 
export async function getLocations() {
  const client = new Client({
    host: 'https://search-estate-i2mq74bcsxvndr5fumr3evo4wi.eu-west-1.es.amazonaws.com'
  });
  
  const result = await client.search({
    index: 'estate',
    body: {
      size: 1000,
      _source: ["location"],
      query: {
        exists: {
          field: "location"
        }
      }
    }
  });
  
  const hits = result.hits.hits;
  let locations = [];
  if(hits.length > 0) {
    locations = hits.map(hit => {
      return {
        lat: parseFloat(hit._source.location.lat),
        lon: parseFloat(hit._source.location.lon),
      };
    })
  }

  return locations;
}
