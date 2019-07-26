import 'babel-polyfill';
import { getMap } from './mymap'
import { search } from './myelastic'

(async () => {
  const queryParams = {
    categories: ['villa'],
    minArea: 45,
    maxPrice: 8000
  }

  const items = await search(queryParams);
  console.log('Found:', items.length);
  
  const map = await getMap(items); 
})();
