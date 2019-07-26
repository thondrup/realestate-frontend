import {showPropsectPreview} from './myUI.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {fromLonLat} from 'ol/proj.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Style, Icon} from 'ol/style.js';
import mapmarker from './mapmarker.png'

export async function getMap(items) {
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

  const markers = items.map(item => {
    const marker = new Feature({
      type: 'marker',
      geometry: new Point(
        fromLonLat([item.location.lon, item.location.lat])
      )
    });

    marker.data = {
      id: item.id
    };

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

  map.on('singleclick', function(e) {
    const feature = map.forEachFeatureAtPixel(e.pixel, function(feature) {
      return feature;
    });

    if(feature !== undefined) {
      showPropsectPreview(feature.data.id);
    }
  });

  return map;
}
