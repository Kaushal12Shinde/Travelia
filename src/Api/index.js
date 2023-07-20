import axios from 'axios';

const ApiKey=process.env.REACT_APP_TRAVEL_ADVSOR_API_1

export const getPlacesData = async(type,sw,ne)=>{
    try{
        const {data: {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Key': `${ApiKey}` ,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });
        return data;
    }
    catch (error){
        console.log(error);
    }
}