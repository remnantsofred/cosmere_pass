import './Map.css';
import React from "react";
import GoogleMapReact from 'google-map-react'; 
import { convertNeSwToNwSe, convertNwSeToNeSw, fitBounds, getTilesIds, latLng2Tile, meters2ScreenPixels, tile2LatLng } from 'google-map-react';
import Panel from '../panel/Panel';
import markerIcon from './Roshar_glyph.png';
import markerIcon2 from './Jeseh_glyph.png';
import markerIcon3 from './marker-glyph.png';

const AnyReactComponent = ({ text, icon, className, lat, lng }) => {
  return (
    <div  icon={icon} className={`${className} map-icon-div`}>
      <img src={icon} alt="marker" className={`${className} map-icon-img`}/>
      {text}
    </div>
  )
};

export default function Map({className="map-container"}){
  const defaultProps = {
    center: {
      lat: 37.77184491560768,
      lng: -122.43681794782202
    },
    zoom: 12.2
  };


  return (
    // Important! Always set the container height explicitly
    // <div style={{ height: '100vh', width: '100%' }} >
    <div className={className} >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent
          className='map-marker'
          lat={37.7784767805642}
          lng={-122.390278737015}
          text="Elendel"
          icon={markerIcon3}
        />
        <AnyReactComponent
          className='map-marker'
          lat={37.789363}
          lng={-122.469686}
          text="Hallandren"
          icon={markerIcon3}
        />
        <AnyReactComponent
          className='map-marker'
          lat={37.80698987}
          lng={-122.4265062}
          text="Kharbranth"
          icon={markerIcon3}
        />
        <AnyReactComponent
          className='map-marker'
          lat={37.76522852}
          lng={-122.5087319}
          text="Kholinar"
          icon={markerIcon3}
        />
        <AnyReactComponent
          className='map-marker'
          lat={37.77923826}
          lng={-122.419274}
          text="Luthadel"
          icon={markerIcon3}
        />
        <AnyReactComponent
          className='map-marker'
          lat={37.768773}
          lng={-122.475818}
          text="Homeland"
          icon={markerIcon3}
        />
        <AnyReactComponent
          className='map-marker'
          lat={37.82204461}
          lng={-122.3702211}
          text="Thaylen City"
          icon={markerIcon3}
        />
        <AnyReactComponent
          className='map-marker'
          lat={37.72703}
          lng={-122.496531}
          text="Purelake"
          icon={markerIcon3}
        />
        <AnyReactComponent
          className='map-marker'
          lat={37.80276415}
          lng={-122.4058526}
          text="Urithiru"
          icon={markerIcon3}
        />
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
