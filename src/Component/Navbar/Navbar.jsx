import React from 'react';
import './Navbar.css';
import { Autocomplete } from '@react-google-maps/api';
import HikingIcon from '@mui/icons-material/Hiking';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({ onPlaceChanged, onLoad , setCounter}) => {

  return ( 
    
    <div className="Navbar">
        <div className="Section flex">
          <div className="header flex">
            <div className="headericon">
              <HikingIcon style={{color:'white'}}/>
            </div>
            <h2>Travelia</h2>
          </div>
          <button onClick={()=>{setCounter(0)}} style={{backgroundColor:'white'}}></button>
          <div className="searchBox flex">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input type="text" placeholder='Explore Places..'/>
            </Autocomplete>
              <div className="searchicon">
                <SearchIcon style={{color:'white'}}/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar
