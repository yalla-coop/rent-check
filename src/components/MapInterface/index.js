import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import Header from '../Header';
import Map from '../Map';
import PostcodeForm from '../PostcodeForm';
import {
  FullScreenContainer,
  ModalContainer,
  ModalOverlay,
} from './MapInterface.style';

import useFetch from '../../useFetch';

function MapInterface() {
  const [searchInput, setSearchInput] = useState('');
  const [center, setCenter] = useState([51.527329, -0.0554895]);
  const [showFormWarning, setShowFormWarning] = useState(false);
  const [legend, setLegend] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // fetch locations
  const [{ data: markers, isLoading }] = useFetch(
    '/.netlify/functions/getLocations'
  );

  // fetch postCode data
  const [
    { data: postCodeInfo, isLoading: postcodesLoading },
    fetchPostCodes,
  ] = useFetch();

  const openSearch = () => {
    setShowSearch(true);
  };

  // handle input value in postcode field and update state
  const handleChange = e => {
    const { value } = e.target;
    setSearchInput(value);
    setShowFormWarning(false);
  };

  // grab postcode and make api call to postcodesIo to get lat Long
  const handleSubmit = e => {
    e.preventDefault();
    const postcode = searchInput;
    if (postcode.length === 0) {
      return setShowFormWarning('Please enter a postcode');
    }

    fetchPostCodes(`https://api.postcodes.io/postcodes/${postcode}`);
    setShowSearch(false);
  };

  const showPostcodeSearch = () => {
    return (
      <div>
        <PostcodeForm
          onSubmit={handleSubmit}
          postcode={searchInput}
          onChange={handleChange}
          showWarning={showFormWarning}
          closeSearch={setShowSearch}
          postcodesLoading={postcodesLoading}
        />
      </div>
    );
  };

  useEffect(() => {
    if (postCodeInfo) {
      const locations = [
        postCodeInfo.result.latitude,
        postCodeInfo.result.longitude,
      ];
      setCenter(locations);
    }
  }, [postCodeInfo]);

  return (
    <React.Fragment>
      <FullScreenContainer>
        {isLoading && <Loading />}
        <Header openSearch={openSearch} />
        {markers && (
          <Map
            markers={markers}
            center={center}
            // useColor={useClassColor} // checkthis!!: useClassColor is not defined anywhere
            toggleLegend={() => setLegend(!legend)}
            legend={legend}
          />
        )}
      </FullScreenContainer>

      {(showSearch || postcodesLoading) && (
        <>
          <ModalOverlay />
          <ModalContainer>{showPostcodeSearch()}</ModalContainer>
        </>
      )}
    </React.Fragment>
  );
}

export default MapInterface;
