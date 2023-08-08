import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar/Navbar";
import List from "./Component/List/List";
import Map from "./Component/Map/Map";
import { getPlacesData } from "./Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [counter, setCounter] = useState(localStorage.getItem('counter') || 0);

  useEffect(() => {
    localStorage.setItem('counter', counter);
  }, [counter]);
  
  const notify = (message) => toast(`${message}`, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

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
    if(boundries!=null){
      if (counter < 8) {
        setCounter((prevCount) => prevCount + 1);
        localStorage.setItem('counter',counter);
        getPlacesData(type,boundries.sw,boundries.ne)
          .then((data)=>{
              // console.log(data);
              setFilteredPlaces([]);
              setRating('');
              setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
              setIsLoading(false);
          });
      }
      else{
        notify("You have reached the limit of requests");
      }
    }
  },[type,boundries]);


  return (
    <div className="App">
        <ToastContainer/>
        <Navbar onPlaceChanged={onPlaceChanged} onLoad={onLoad} setCounter={setCounter}/>
     
             
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