import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import Header from '../Header';
import Map from '../Map';
import PostcodeForm from '../PostcodeForm';
import {
  FullScreenContainer,
  ModalContainer,
  ModalOverlay,
} from './MapInterface.style';

function MapInterface() {
  const defaultLocation = [51.527329, -0.0554895];

  // TODO: consider replacing all this useState with useReducer
  const [loaded, setLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState([51.527329, -0.0554895]);
  const [showFormWarning, setShowFormWarning] = useState(false);
  const [legend, setLegend] = useState(false);

  // ref to keep track of how many times the
  // fetch function was called
  const calledTimes = useRef(0);

  // Loading Screen Function
  const showLoadingScreen = () => {
    const loadingTime = 2000;
    setTimeout(() => setLoaded(true), loadingTime);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        calledTimes.current += 1;
        const { data } = await axios('/.netlify/functions/getLocations');
        if (data.length) {
          setMarkers(data);
        } else if (calledTimes.current < 2) {
          setTimeout(fetchLocations, 5000);
        }
        setMarkers(data);
      } catch (err) {
        // TODO: Common retch error handling logic
        // eslint-disable-next-line no-console
        console.log('err', err);
      }
    };
    fetchLocations();
    showLoadingScreen();
  }, []);

  // FORM FUNCTIONS
  const openSearch = () => {
    setCenter(false);
  };

  const closeSearch = () => {
    setCenter(defaultLocation);
  };

  // handle input value in postcode field and update state
  const handleChange = e => {
    const { value } = e.target;
    setSearchInput(value);
    setShowFormWarning(false);
  };

  // function to create lat long array to update the center key in state
  // Check if postcode exists or not depending on status code
  // if status code 404 update status and keep center at default location, otherwise return lat long array
  const checkResponse = res => {
    // TODO: check What is this about!! 7?? 6??
    const location = [
      Object.values(res.result)[7],
      Object.values(res.result)[6],
    ];
    setCenter(location);
    setShowFormWarning(false);
  };

  const apiCallGeo = async postcode => {
    try {
      const { data } = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      checkResponse(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('err', error);
      setShowFormWarning('Please enter a postcode');
    }
  };

  // grab postcode and make api call to postcodesIo to get lat Long
  const handleSubmit = e => {
    e.preventDefault();
    // const { searchInput } = this.state;
    const postcode = searchInput;
    if (postcode.length === 0) {
      // return this.setState({ showFormWarning: 'Please enter a postcode' });
      return setShowFormWarning('Please enter a postcode');
    }
    apiCallGeo(postcode);
  };

  // function to either render form or map
  // if the center is default then render form to put in postcode
  const showPostcodeSearch = () => {
    if (center === false) {
      return (
        <div>
          <PostcodeForm
            onSubmit={handleSubmit}
            postcode={searchInput}
            onChange={handleChange}
            showWarning={showFormWarning}
            closeSearch={closeSearch}
          />
        </div>
      );
    }
  };

  // toggle Legend
  const toggleLegend = () => {
    setLegend(!legend);
  };

  const modal = <ModalContainer>{showPostcodeSearch}</ModalContainer>;

  return (
    <React.Fragment>
      <FullScreenContainer>
        {(!loaded || !markers) && <Loading />}
        <Header openSearch={openSearch} />
        {markers && loaded && (
          <Map
            markers={markers}
            center={center || defaultLocation}
            // useColor={useClassColor} // checkthis!!: useClassColor is not defined anywhere
            toggleLegend={toggleLegend}
            legend={legend}
          />
        )}
      </FullScreenContainer>

      {loaded && markers && !center && <ModalOverlay />}
      {loaded && markers && !center && modal}
    </React.Fragment>
  );
}

export default MapInterface;
