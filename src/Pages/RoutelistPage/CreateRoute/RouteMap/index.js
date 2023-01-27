import React, {useEffect, useRef} from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker/marker";



export default function RouteMap(props){


    const defaultProps = {
        center:{
            lat: 30.4390,
            lng: 72.3552
        },
        zoom: 11
    };


    const renderMarkers = (map, maps) => {

    };



    return(
        <>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAoyevYqWkjKEJjq6vPXzfhulxkIecZhX0" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
                >


                    <Marker
                        draggable={false}
                        position={defaultProps.center}
                        map
                        // lat={props.lat}
                        // lng={props.lng}
                        name="My Marker"
                    />

                </GoogleMapReact>
            </div>
        </>
    )

}