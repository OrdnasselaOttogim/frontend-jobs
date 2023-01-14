import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import icon from "./marker-icon.png";

export default function MapLeaflet(props){
  let mapContainer;
  let map;
  const center = props.center;
  const [polyline, setPolyline] = useState();
  const [homeMarker, setHomeMarker] = useState();

  useEffect(() => {
    if (polyline !== undefined){
      polyline.remove();
      if (homeMarker !== undefined){
        homeMarker.remove();
      }
      map = L.map('map').setView(center, 13);
      if (props.positions.length){
        setPolyline(L.polyline(props.positions).addTo(map));
        let tempHomeMarker = L.marker(props.positions[0], {icon:DefaultIcon}).addTo(map);
        tempHomeMarker.bindPopup(props.homeAddress)
        setHomeMarker(tempHomeMarker);
      }
    }
  }, [props]);

  let DefaultIcon = L.icon({
      iconUrl: icon,
      iconSize: [25,41],
      iconAnchor: [12,41]
  });

  useEffect(() => {
      mapContainer = L.DomUtil.get('map');
    if(mapContainer != null){
      mapContainer._leaflet_id = null;
    }  
      map = L.map('map').setView(center, 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
        let jobPosition = L.marker(props.positions[0], {icon:DefaultIcon}).addTo(map);
        setPolyline(L.polyline(props.positions).addTo(map));
    },[])

    return (
        <div className="map-container" ref={el => mapContainer = el} id="map" style={{height:"75vh"}}>
        </div>
      )
}

