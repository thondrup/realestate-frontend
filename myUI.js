import { getItem } from './myelastic'

export async function showPropsectPreview(id) {
  const item = await getItem(id);
  console.log(item);
  window.open(id);
}