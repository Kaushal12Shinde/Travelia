import React from "react";
import "./map.css";
import PlaceIcon from "@mui/icons-material/Place";
import GoogleMapReact from "google-map-react";


const Map = ({ setCoordinates, setBoundries, coordinates, places }) => {

  const Marker = ({ place }) => (
    <div className="marker">
      <PlaceIcon className="markerIcon" />
      <p className="markerName">{place.name}</p>
    </div>
  );

  const ApiKey=process.env.REACT_APP_MAP_API

  return (
    <div className="Map">
      <div className="mapContainer" style={{ position: "absolute", width: "100%", height: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${ApiKey}`,map_ids: "179da32bc51d1681" }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={{ disableDefaultUI: true, zoomControl: true }}
          onChange={(e) => {
            console.log("getting from mape object", e);
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBoundries({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
          onChildClick={""}
          >
            {places && places.filter((place) => place.latitude && place.longitude)
            .map((place, index) => {
              return (
                <Marker
                  key={index}
                  lat={parseFloat(place.latitude)}
                  lng={parseFloat(place.longitude)}
                  place={place}
                />
              );
            })}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;

