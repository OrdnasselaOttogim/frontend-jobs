import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import icon from "./marker-icon.png";




export default function MapLeaflet(props){
  let mapContainer;
  let map;
    // let mapContainer = L.DomUtil.get('map');
    // if(mapContainer != null){
    //   mapContainer._leaflet_id = null;
    // };

    const position = [46.0655017,11.154962];

    // const [itinerary, setItinerary] = useState(props.positions);

    // let map = L.map("map").setView(position, 13);
    // const [map, setMap] = useState();
    const [polyline, setPolyline] = useState();

    useEffect(() => {
      console.log("change polyline");
      if (polyline != undefined){
        polyline.remove();
        map = L.map('map').setView(position, 13);
        setPolyline(L.polyline(props.positions).addTo(map));
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

        map = L.map('map').setView(position, 13);
        // map.invalidateSize();
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
      

        var markerStart = L.marker(props.positions[0], {icon:DefaultIcon}).addTo(map);
        var markerEnd = L.marker(props.positions[props.positions.length-1], {icon:DefaultIcon}).addTo(map);
        setPolyline(L.polyline(props.positions).addTo(map));
    },[])

    return (
        <div className="map-container" ref={el => mapContainer = el} id="map" style={{height:"75vh"}}>
        </div>
      )
}

