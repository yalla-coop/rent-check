/* eslint-disable no-console */
import React, { Component } from 'react';
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

class MapInterface extends Component {
  state = {
    markers: false,
    loaded: false,
    searchInput: '',
    center: [51.527329, -0.0554895],
    showFormWarning: false,
    legend: false,
  };

  defaultLocation = [51.527329, -0.0554895];

  componentDidMount() {
    // this.showLoadingScreen();
    this.callApi().catch(err => console.log(err));
  }

  // api call made to backend to fetch airtable object
  callApi = async () => {
    this.calledTimes = 0;
    const { data } = await axios('/.netlify/functions/getLocations');
    console.log('data', data);
    if (data.length > 0) {
      this.setState({ markers: data, loaded: true });
    } else if (this.calledTimes < 2) {
      setTimeout(this.callApi, 5000);
    }
  };

  // FORM FUNCTIONS
  openSearch = () => {
    this.setState({ center: false });
  };

  closeSearch = () => {
    this.setState({ center: this.defaultLocation });
  };

  // handle input value in postcode field and update state
  handleChange = event => {
    const { value } = event.target;
    this.setState({ searchInput: value, showFormWarning: false });
  };

  // grab postcode and make api call to postcodesIo to get lat Long
  handleSubmit = event => {
    const { searchInput } = this.state;
    event.preventDefault();
    const postcode = searchInput;
    if (postcode.length === 0) {
      return this.setState({ showFormWarning: 'Please enter a postcode' });
    }
    this.apiCallGeo(postcode);
  };

  apiCallGeo = postcode => {
    fetch(`https://api.postcodes.io/postcodes/${postcode}`)
      .then(res => res.json())
      .then(res => this.checkResponse(res));
  };

  // function to create lat long array to update the center key in state
  // Check if postcode exists or not depending on status code
  // if status code 404 update status and keep center at default location, otherwise return lat long array
  checkResponse = res => {
    if (res.status === 404) {
      return this.setState({
        showFormWarning: 'Please enter a valid postcode',
        center: false,
      });
    }
    const location = [
      Object.values(res.result)[7],
      Object.values(res.result)[6],
    ];
    return this.setState({ showFormWarning: false, center: location });
  };

  // function to either render form or map
  // if the center is default then render form to put in postcode
  showPostcodeSearch = () => {
    const { center, searchInput, showFormWarning } = this.state;
    if (center === false) {
      return (
        <div>
          <PostcodeForm
            onSubmit={this.handleSubmit}
            postcode={searchInput}
            onChange={this.handleChange}
            showWarning={showFormWarning}
            closeSearch={this.closeSearch}
          />
        </div>
      );
    }
  };

  // Loading Screen Function
  showLoadingScreen = () => {
    const loadingTime = 2000;
    setTimeout(() => this.setState({ loaded: true }), loadingTime);
  };

  // toggle Legend
  toggleLegend = () => {
    this.setState(preState => {
      return { legend: !preState.legend };
    });
  };

  render() {
    const { loaded, markers, center, useClassColor, legend } = this.state;
    const modal = (
      <ModalContainer>{this.showPostcodeSearch(center)}</ModalContainer>
    );
    return (
      <React.Fragment>
        <FullScreenContainer>
          {(!loaded || !markers) && <Loading />}
          <Header openSearch={this.openSearch} />
          {markers && loaded && (
            <Map
              markers={markers}
              center={center || this.defaultLocation}
              useColor={useClassColor}
              toggleLegend={this.toggleLegend}
              legend={legend}
            />
          )}
        </FullScreenContainer>

        {loaded && markers && !center && <ModalOverlay />}
        {loaded && markers && !center && modal}
      </React.Fragment>
    );
  }
}

export default MapInterface;
