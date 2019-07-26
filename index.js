import 'babel-polyfill';
import { getMap } from './mymap'
import { getItems } from './myelastic'

(async () => {
  const items= await getItems();
  const map = await getMap(items); 
})();
