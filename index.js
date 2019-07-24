import 'babel-polyfill';
import { getMap } from './mymap'
import { getLocations } from './myelastic'

(async () => {
  const locations = await getLocations();
  const map = await getMap(locations); 
})();
