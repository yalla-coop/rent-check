import React from 'react';
import { Button } from 'antd';

import styled from "styled-components";

export default function RequestStreetRep(props) {
  return (
    <div className="w-100 bg-dark-pink white ph2 dt">
      <div className="dtc v-mid tc pt5 vh-100">
        <section className="measure lh-copy db mh-auto">
          <h1>Become a street rep!</h1>
          <p>Make your community stronger by becoming a street rep for Guardians of 
          the Arches and East End Trades Guild.</p>
          <p>Street reps play a crucial role in the Rent Check app by verifying that users
          and data added to the app are trustworthy, keeping our community safe from 
          those who might try to sneak their way in to access our data.</p>
          <p>To become a street rep for your local area, you will need to request Street
          Rep status by clicking the button below, and then you will need to speak to an
          existing street rep in person to complete your request.</p>
          <Button>Be a street rep</Button>
          <Button>View a list of street reps</Button>
        </section>
      </div>
    </div>
  )
}