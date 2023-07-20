import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar/Navbar";
import List from "./Component/List/List";
import Map from "./Component/Map/Map";
import { getPlacesData } from "./Api";
import PlacesData from "./PlacesData";
// import { Autocomplete } from "@react-google-maps/api";

function App() {
  
  const [places, setPlaces] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");

  const [rating, setRating] = useState("");

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({
    lat: 19.0473,
    lng: 73.0699,
  });

  const [boundries, setBoundries] = useState(null);

  //-----current coordinate
    
    useEffect(()=>{
      navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
        setCoordinates({lat:latitude,lng:longitude});
      })
    },[]);


  //-----rating Type is switched
    
    useEffect(() => {
      const filtered = places.filter((place) => Number(place.rating) > rating);
      setFilteredPlaces(filtered);
    }, [rating]);

  //-----getting data from Travell advisor app
  
  useEffect(()=>{
    console.log('get final cord',coordinates,boundries);
       setIsLoading(true);
    //async function so then
    if(boundries!=null){
      getPlacesData(type,boundries.sw,boundries.ne)
        .then((data)=>{
            console.log(data);
            setFilteredPlaces([]);
            setPlaces(data);
            setIsLoading(false);
        });
    }
  },[type,coordinates,boundries]);

  //-----testing purpose..
    
    // useEffect(() => {
    //   setPlaces(PlacesData);
    //   setFilteredPlaces([]);
    // }, []);

    // useEffect(() => {
    //   console.log(places);
    // }, [places]);

  return (
    <div className="App">
      {/* <Autocomplete> */}
        <Navbar />
      {/* </Autocomplete> */}
             
      <section className="main">
        <List
          places={filteredPlaces.length ? filteredPlaces : places}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
        />
        <Map
          setCoordinates={setCoordinates}
          setBoundries={setBoundries}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
        />
      </section>
    </div>
  );
}

export default App;
