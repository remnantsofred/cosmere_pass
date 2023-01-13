import './Map.css';
import React from "react";
import GoogleMapReact from 'google-map-react';
import Panel from '../panel/Panel';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map({className="map-container"}){
  const defaultProps = {
    center: {
      lat: 37.78511512985764,
      lng: -122.40753194602581
    },
    zoom: 14
  };

  return (
    // Important! Always set the container height explicitly
    // <div style={{ height: '100vh', width: '100%' }} >
    <div className={className} >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
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
