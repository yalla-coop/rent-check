import React from 'react';
import { Button } from 'antd';

export default function StreetReps(props) {
  return (
      <div className="vh-100 w-100 flex justify-center align-center bg-light-blue" {...props}>
        <section className="pt5 ph2 measure lh-copy">
          <h1 className="tc mt3">Street Reps</h1>
          <p>Street reps play a crucial role in the Rent Check app by verifying that users
          and data added to the app are trustworthy, keeping our community safe from 
          those who might try to sneak their way in.</p>
          <p>If you have questions about sharing your data, how to use the app, or concerns
          about untrustworthy users or data, please speak to your local street rep.</p>
          <div className="flex flex-column w-100 w-60-ns ml-auto mr-auto mv4">
            <Button>Find a street rep</Button>
          </div>
          <p>You can help to make your community stronger by becoming a street rep for
          your local area. To find out more, click the button below:</p>
          <div className="flex flex-column w-100 w-60-ns ml-auto mr-auto mv4">
            <Button>Become a street rep</Button>
          </div>
        </section>
      </div>
  )
}