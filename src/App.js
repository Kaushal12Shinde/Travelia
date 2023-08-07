import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar/Navbar";
import List from "./Component/List/List";
import Map from "./Component/Map/Map";
import { getPlacesData } from "./Api";

function App() {
  
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [rating, setRating] = useState("");
  const [type, setType] = useState("restaurants");
  
  const [coordinates, setCoordinates] = useState({});
  const [boundries, setBoundries] = useState(null);

  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete && autocomplete.getPlace() && autocomplete.getPlace().geometry && autocomplete.getPlace().geometry.location) {
      const latitude = autocomplete.getPlace().geometry.location.lat();
      const longitude = autocomplete.getPlace().geometry.location.lng();
      setCoordinates({ lat:latitude, lng:longitude });
    }
  };

  
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
            // console.log(data);
            setFilteredPlaces([]);
            setRating('');
            setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
            setIsLoading(false);
        });
    }
  },[type,boundries]);


  return (
    <div className="App">
      
        <Navbar onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>
     
             
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