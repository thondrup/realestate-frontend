import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {fromLonLat} from 'ol/proj.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {Control} from 'ol/control.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Style, Icon} from 'ol/style.js';
import mapmarker from './mapmarker.png'
import filter from './menu.png'

export async function getMap(locations) {
  const image = document.createElement('img');
  image.setAttribute('src', filter);
  image.setAttribute('class', 'filter');
  
  const button = document.createElement('button');

  const showFilter = function(e) {
    console.log('show filter');
  };

  button.addEventListener('click', showFilter, false);
  button.appendChild(image);

  const element = document.createElement('div');
  element.className = 'custom-control ol-unselectable ol-control';
  element.appendChild(button);


  var FilterControl = new Control({
    element: element
  });

  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        preload: 4,
        source: new OSM()
      })
    ],
    loadTilesWhileAnimating: true,
    view: new View({
      center: fromLonLat([18,60]),
      zoom: 5
    })
  });

  map.addControl(FilterControl);

  const markers = locations.map(location => {
    const marker = new Feature({
      type: 'marker',
      geometry: new Point(
        fromLonLat([location.lon, location.lat])
      )
    });
    return marker
  });

  const styles = {
    'marker': new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: mapmarker,
        size: [512, 512],
        scale: 0.05
      })
    }),
  };

  const vectorSource = new VectorSource({
    features: markers
  });

  const markerVectorLayer = new VectorLayer({
    source: vectorSource,
    style: function(feature) {
      return styles[feature.get('type')]
    }
  });

  map.addLayer(markerVectorLayer);

  return map;
}
