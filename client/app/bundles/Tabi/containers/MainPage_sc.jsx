import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as api from "../../utils/utils";
import BootstrapModal from "../components/single_day_components/BootstrapModal_dc";
import TripDatesForm from "../components/single_day_components/TripDatesForm_dc";
import ModalHeader from "../components/single_day_components/ModalHeader_dc";
import SignInForm from "../components/single_day_components/SignInForm_dc";
import LandingPageChoices from "../components/single_day_components/LandingPageChoices_dc";

import FlightFormContainer from "./FlightFormContainer_sc";
import moment from "moment";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTrip: false,
      windowHeight: window.innerHeight,
      tripStartDate: moment(),
      tripEndDate: moment(),
      showFlightForm: null,
      showLoginForm: false,
      signedIn: false
    };

    this.handleAddStartDate = this.handleAddStartDate.bind(this);
    this.handleAddEndDate = this.handleAddEndDate.bind(this);

    this.handleNewTrip = this.handleNewTrip.bind(this);
    this.handleAddFlight = this.handleAddFlight.bind(this);
    this.handleWindowSize = this.handleWindowSize.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);

  }

  handleAddFlight(addFlight) {
    this.setState({ showFlightForm: addFlight });
  }

  handleAddStartDate(e) {
    this.setState({ tripStartDate: e });
  }

  handleAddEndDate(e) {
    this.setState({ tripEndDate: e });
  }

  handleNewTrip() {
    if (this.state.signedIn) {
      if (this.state.newTrip) {
        this.setState({
          newTrip: !this.state.newTrip,
          showFlightForm: null
        });
      } else {
        this.setState({ newTrip: !this.state.newTrip });
      }
    } else {
      console.log("stop showing form");
      this.setState({ showLoginForm: !this.state.showLoginForm });
    }
  }

  handleWindowSize() {
    this.setState({ windowHeight: window.innerHeight });
  }

  toggleSignIn(){
    console.log("toggle signedIn");
    this.setState({ signedIn: !this.state.signedIn });
    this.handleNewTrip();

  }

  render() {
    const displayForm = this.state.showFlightForm
      ? <FlightFormContainer
          titleChange={this.handleModalHeaderChange}
          onClose={this.handleNewTrip}
          departureDate={this.state.tripStartDate}
          returnDate={this.state.tripEndDate}
        />
      : <TripDatesForm
          handleAddStartDate={this.handleAddStartDate}
          handleAddEndDate={this.handleAddEndDate}
          handleAddFlight={this.handleAddFlight}
          tripStartDate={this.state.tripStartDate}
          tripEndDate={this.state.tripEndDate}
        />;

    const displayModal = this.state.newTrip
      ? <BootstrapModal
          title={"Start New Trip"}
          topMargin={"100px"}
          backdrop={true}
          header={
            <ModalHeader type={"new trip"} onClose={this.handleNewTrip}>
              <div className="mt-1 mb-1">
                <b>New Trip</b>
                <hr />
              </div>
            </ModalHeader>
          }
        >
          {displayForm}
        </BootstrapModal>
      : null;

    const pageChoices = this.state.showLoginForm ? <SignInForm toggleSignIn={this.toggleSignIn}/> : 
    <LandingPageChoices handleNewTrip={this.handleNewTrip} />;

    return (
      <div
        className="banner text-center mb-3"
        style={{ height: this.state.windowHeight }}
      >
        <div className="pt-4 text-shadow">
          <h1 className="display-1"><strong>Tabi</strong></h1>
          <h3 className="mt-3 text-shadow">Plan Your Journey</h3>
        </div>
        {pageChoices}
        {displayModal}

      </div>
    );
  }
}