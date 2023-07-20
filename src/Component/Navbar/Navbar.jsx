import React from 'react';
import './Navbar.css';
import HikingIcon from '@mui/icons-material/Hiking';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {

  return ( 
    
    <div className="Navbar">
        <div className="Section flex">
          <div className="header flex">
            <div className="headericon">
              <HikingIcon style={{color:'white'}}/>
            </div>
            <h2>Travelia</h2>
          </div>
          <div className="searchBox flex">
            {/* <Autocomplete> */}
              <input type="text" placeholder='Explore..' value='' />
            {/* </Autocomplete> */}
              <div className="searchicon">
                <SearchIcon style={{color:'white'}}/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar
