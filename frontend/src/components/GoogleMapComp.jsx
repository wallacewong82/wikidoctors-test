import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useGetMapApiQuery } from "../slices/mapSlice";
import Loader from "./Loader";
import Message from "./Message";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMapComp = ({ center, zoom, height, locationname }) => {
  const { data: apiUrl, isLoading, error } = useGetMapApiQuery();
  const [apiKey, setApiKey] = useState(null);
  const [mapKey, setMapKey] = useState(0); // Key to force remount of map component
  useEffect(() => {
    if (apiUrl) {
      setApiKey(apiUrl);
    }
  }, [apiUrl, setApiKey]);

  useEffect(() => {
    // This effect will run whenever the `center` prop changes
    // You can perform any map-related updates here
    // Increment the map key to force remount of the map component
    setMapKey((prevKey) => prevKey + 1);
  }, [center]);

  const defaultProps = {
    center: center,
    zoom: zoom,
  };
  //console.log(center);
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
  return (
    <>
      {isLoading || apiKey == null ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        // Important! Always set the container height explicitly
        <div style={{ height: height, width: "100%" }}>
          <GoogleMapReact
            key={mapKey}
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <AnyReactComponent
              lat={center.lat}
              lng={center.lng}
              text={locationname}
            />
          </GoogleMapReact>
        </div>
      )}
    </>
  );
};

export default GoogleMapComp;
