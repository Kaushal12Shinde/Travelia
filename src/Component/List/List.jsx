import React, { useState } from 'react'
import './list.css'
import PlaceDetails from '../Details/PlaceDetails'

const List = ({ places , isLoading , type , setType , rating , setRating }) => {
   
  
  return (
    <div className='List'>
      <h3>Restaurants, Hotel & Attractions around you</h3>
      
      {isLoading?
        <div>Loading</div> :
        <>
          <form>
              <label htmlFor="type">Type</label>
              <select id="type" value={type} onChange={(e)=>setType(e.target.value)}>
                  <option value='restaurants'>Restaurants</option>
                  <option value='hotels'>Hotels</option>
                  <option value='attractions'>Attractions</option>
              </select>
              <label htmlFor="rating">Ratings</label>
              <select id="rating" value={rating}onChange={(e)=>setRating(e.target.value)}>
                  <option value={0}>All</option>
                  <option value={3}>Above 3.0</option>
                  <option value={4}>Above 4.0</option>
                  <option value="4.5">Above 4.5</option>
              </select>
          </form>
          <div className='display'>
            {places && places.map((place,index)=>{return <PlaceDetails key={index} place={place}/>})}
          </div>
        </>
      }
    </div>
  )
}


export default List