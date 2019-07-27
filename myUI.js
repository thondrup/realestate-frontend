import { getItem } from './myelastic'

export async function showPropsectPreview(id) {
  const prospectElem = document.getElementById('previewProspect');
  prospectElem.style.display = 'block';

  const prospectCloseElem = document.getElementById('previewProspectClose');
  prospectCloseElem.addEventListener("click", function() {
    closePropsectPreview();
  });

  const item = await getItem(id);

  if(item.images.length > 0) {
    const image = new Image();
    image.onload = function() {
      const imageElem = document.getElementById('previewProspectImage');
      imageElem.setAttribute("src" ,this.src);
    }
    image.src = item.images[0];
  }

  const linkElem = document.getElementById('previewProspectLink');
  linkElem.setAttribute('href', item.link);

  const priceElem = document.getElementById('previewProspectPrice');
  priceElem.innerHTML = item.price + ",- per mnd.";

  const areaElem = document.getElementById('previewProspectArea');
  areaElem.innerHTML = item.area + "&#x33a1;";

  const categoryElem = document.getElementById('previewProspectCategory');
  categoryElem.innerHTML =  item.category;

  const descriptionElem = document.getElementById('previewProspectDescription');
  const maxDescriptionLength = 600;
  descriptionElem.innerHTML = item.description.substring(0, maxDescriptionLength)
  if(item.description.length > maxDescriptionLength) {
    descriptionElem.innerHTML += "...";
  }
}

export async function closePropsectPreview() {
  const prospectElem = document.getElementById('previewProspect');
  prospectElem.style.display = 'none';
}