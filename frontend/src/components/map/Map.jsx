import './Map.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
 
export const MapContainer =({google})=> {
    
    return (
      <Map google={google} zoom={13} center={{lat:37.7, lng: 122.4}} mapContainerClassName="map-container">
        <Marker name={'Current location'} />
        <InfoWindow >
            <div>
              {/* <h1>{this.state.selectedPlace.name}</h1> */}
            </div>
        </InfoWindow>
      </Map>
    );
  
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)