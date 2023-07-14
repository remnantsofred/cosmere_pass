import './Map.css';
import React from "react";
import GoogleMapReact from 'google-map-react'; 
import { convertNeSwToNwSe, convertNwSeToNeSw, fitBounds, getTilesIds, latLng2Tile, meters2ScreenPixels, tile2LatLng } from 'google-map-react';
import Panel from '../panel/Panel';
import markerIcon from './Roshar_glyph.png';
import markerIcon2 from './Jeseh_glyph.png';
import markerIcon3 from './marker-glyph.png';
import MapInfoBlurb from '../MapInfoBlurb/MapInfoBlurb';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, fetchLocations } from '../../store/location';
import { getItemByID } from '../../utils/general_util';

export const Marker = ({ text, icon, className, lat, lng, location, setMapBlurbState, mapBlurbState }) => {
  
  return (
    <div  
      icon={icon} 
      className={`${className} map-icon-div`}
      // onClick={() => setMapBlurbState(`${location.locationName}`)}
      // onMouseEnter={() => setMapBlurbState(`${location.locationName}`)}
      // onMouseLeave={() => setMapBlurbState(false)}
      >
      <img src={icon} alt="marker" className={`${className} map-icon-img`}/>
      {text}
    </div>
  )
};

export const defaultProps = {
  center: {
    lat: 37.77184491560768,
    lng: -122.43681794782202
  },
  zoom: 12.2
};


export const ElendelCenter = {
  lat: 37.7784767805642,
  lng: -122.390278737015
}

export const HallandrenCenter = {
  lat: 37.789363,
  lng: -122.469686
}

export const KharbranthCenter = {
  lat: 37.81059022922289,
  lng: -122.42453374617786
}

export const KholinarCenter = {
  lat: 37.76522852,
  lng: -122.5087319
}

export const LuthadelCenter = {
  lat: 37.77923826,
  lng: -122.419274
}

export const HomelandCenter = {
  lat: 37.768773,
  lng: -122.475818
}

export const ThaylenCityCenter = {
  lat: 37.82204461,
  lng: -122.3702211
}

export const PurelakeCenter = {
  lat: 37.72703,
  lng: -122.496531
}

export const UrithiruCenter = {
  lat: 37.80276415,
  lng: -122.4058526
}

const locationMap = {
  1: ElendelCenter,
  2: HallandrenCenter,
  3: KharbranthCenter,
  4: KholinarCenter,
  5: LuthadelCenter,
  6: HomelandCenter,
  7: ThaylenCityCenter,
  8: PurelakeCenter,
  9: UrithiruCenter
}

export default function Map({className="map-container", id="", location, locProps=defaultProps, source}){
  const dispatch = useDispatch();
  const [mapBlurbState, setMapBlurbState] = useState(false);
  const locations = useSelector(getLocations);

  useEffect(()=>{
    dispatch(fetchLocations())
  }, [])


  const onMarkerClick = (e) => {
    if (source === 'search') {
      setMapBlurbState(e)
    }
  }
    

  return (
    // Important! Always set the container height explicitly
    // <div style={{ height: '100vh', width: '100%' }} >
    <div className={`${className} map-container`} >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY ? process.env.REACT_APP_MAPS_API_KEY : 'AIzaSyCkBF4PpIZfx2vlFas_pBrsebbFerCCeg0' }}
        defaultCenter={ locProps.center }
        defaultZoom={ locProps.zoom }
        yesIWantToUseGoogleMapApiInternals
        onChildClick={e => onMarkerClick(e)}
        onClick={e => setMapBlurbState(false)}
      >
        { mapBlurbState === '1-map-marker' && <MapInfoBlurb location={getItemByID(1, locations)} className='map-info-blurb'/> }
        { mapBlurbState === '2-map-marker' && <MapInfoBlurb location={getItemByID(2, locations)} className='map-info-blurb'/> }
        { mapBlurbState === '3-map-marker' && <MapInfoBlurb location={getItemByID(3, locations)} className='map-info-blurb'/> }
        { mapBlurbState === '4-map-marker' && <MapInfoBlurb location={getItemByID(4, locations)} className='map-info-blurb'/> }
        { mapBlurbState === '5-map-marker' && <MapInfoBlurb location={getItemByID(5, locations)} className='map-info-blurb'/> }
        { mapBlurbState === '6-map-marker' && <MapInfoBlurb location={getItemByID(6, locations)} className='map-info-blurb'/> }
        { mapBlurbState === '7-map-marker' && <MapInfoBlurb location={getItemByID(7, locations)} className='map-info-blurb'/> }
        { mapBlurbState === '8-map-marker' && <MapInfoBlurb location={getItemByID(8, locations)} className='map-info-blurb'/> }
        { mapBlurbState === '9-map-marker' && <MapInfoBlurb location={getItemByID(9, locations)} className='map-info-blurb'/> }
       
        {locations?.map(location => 
          <Marker 
            key={`${location.id}-map-marker`}
            className='map-marker'
            lat={locationMap[location.id].lat}
            lng={locationMap[location.id].lng}
            text={location.locationName}
            title={location.locationName}
            icon={markerIcon3}
            location={location}
          />)}
        
        
      </GoogleMapReact>
    </div>
  );
}

// import './Map.css';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-map-react';
// // import { GoogleMap, useLoadedScript, Marker } from '@react-google-maps/api';
// import Loading from '../loading/Loading';

// export const MapContainer =({google})=> {
    
//     return (
//       <Map google={google} zoom={12} center={{lat:37.78511512985764, lng:-122.40753194602581}} mapContainerClassName="map-container">
//         <Marker name={'Current location'} />
//         <InfoWindow >
//             <div>
//               {/* <h1>{this.state.selectedPlace.name}</h1> */}
//             </div>
//         </InfoWindow>
//       </Map>
//     );
  
// }
 
// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_MAPS_API_KEY
// })(MapContainer)

// export const Home = () => {
//   const { isLoaded} = useLoadedScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   if (!isLoaded){
//     return <Loading />
//   } else {
//     return (
//       <div className='mapContainer'>
//         <Map />
//       </div>
//     )
//   }
// }

// function Map() {
//   <GoogleMap 
//     zoom={12} 
//     center={{lat:37.78511512985764, lng:-122.40753194602581}} 
//     mapContainerClassName="map-container">

//   </GoogleMap>;
// }

// export default Home
