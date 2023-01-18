// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';

// const mapStyles = {
//   width: '670px',
//   height: '50%'
// };

// export class GoogleMap extends Component {
//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={4}
//         style={mapStyles}
//         initialCenter={{
//          lat: 6.2518401,
//          lng: -75.563591
//         }}
//       />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAoyevYqWkjKEJjq6vPXzfhulxkIecZhX0'
// })(GoogleMap);


// import React from 'react';
// import GoogleMapReact from 'google-map-react';

// const GoogleMap = ({ latitude, longitude }) => {
//  const renderMarkers = (map, maps) => {
//   let marker = new maps.Marker({
//   position: { lat: latitude, lng: longitude },
//   map,
//   title: 'Hello World!'
//   });
//   return marker;
//  };

//  return (
//    <div style={{ height: '50vh', width: '100%' }}>
//     <GoogleMapReact
//       bootstrapURLKeys={{ key: 'AIzaSyAoyevYqWkjKEJjq6vPXzfhulxkIecZhX0' }}
//       defaultCenter={{ lat: latitude, lng: longitude }}
//       defaultZoom={16}
//       yesIWantToUseGoogleMapApiInternals
//       onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
//     >
//     </GoogleMapReact>
//    </div>
//  );
// };

// export default GoogleMap;

import React, { useMemo, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = () => {
  // let resolver;
  // let rejector;
  // const promise = new Promise((resolve, reject) => {
  //   resolver = resolve;
  //   rejector = reject;
  // });
  // return { promise, resolver, rejector };


const useMarker = ({ lat, lng }) => {
  const { 
    promise: apiPromise, 
    resolver: handleGoogleApiLoaded 
  } = useMemo(
    // createControlledPromise,
    []
  ).current;

  useEffect(
    () => {
      let marker;
      apiPromise.then(api => {
        const { map, maps } = api;
        marker = new maps.Marker({ position: { lat, lng }, map });
      });
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    },
    [lat, lng],
  );
  return { handleGoogleApiLoaded };
};

const Location = ({
  location: { locationName, lat, lng }
}) => {
  const { handleGoogleApiLoaded } = useMarker({ lat, lng });
  return (
    <section>
      <h1>{locationName}</h1>
      <p>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAoyevYqWkjKEJjq6vPXzfhulxkIecZhX0"}}
          center={{ lat, lng }}
          defaultZoom={11}
          onGoogleApiLoaded={handleGoogleApiLoaded}
        />
      </p>
    </section>
  );
};
}
export default GoogleMap;

