import React from 'react';
import { Collapse, List, Button } from 'antd';

const { Panel } = Collapse;

const data = [
  {
    name: 'Street Rep Name 1',
    companyName: 'Company 1',
    companyAddress: {
      addressLine1: 'Address Line 1',
      addressLine2: 'Address Line 2',
      city: 'City',
      postcode: 'E8 3XY',
    },
  },
  {
    name: 'Street Rep Name 2',
    companyName: 'Company 2',
    companyAddress: {
      addressLine1: 'Address Line 1',
      addressLine2: 'Address Line 2',
      city: 'City',
      postcode: 'E8 3XY',
    },
  },
  {
    name: 'Street Rep Name 3',
    companyName: 'Company 3',
    companyAddress: {
      addressLine1: 'Address Line 1',
      addressLine2: 'Address Line 2',
      city: 'City',
      postcode: 'E8 3XY',
    },
  },
  {
    name: 'Street Rep Name 4',
    companyName: 'Company 4',
    companyAddress: {
      addressLine1: 'Address Line 1',
      addressLine2: 'Address Line 2',
      city: 'City',
      postcode: 'E8 3XY',
    },
  },
];

export default function StreetReps(props) {
  return (
    <article className="vh-100 dt w-100 bg-light-pink pv5" {...props}>
      <div className="dtc v-mid tc black-80 ph3 ph4-l">
        <div className="measure-wide lh-copy db ml-auto mr-auto f6 f5-ns">
          <h1 className="f1 tc mt3">Street Reps</h1>
          <p>
            Street reps play a crucial role in the Rent Check app by verifying
            that users and data added to the app are trustworthy, keeping our
            community safe from those who might try to sneak their way in.
          </p>
          <p>
            If you have questions about sharing your data, how to use the app,
            or concerns about untrustworthy users or data, please speak to your
            local street rep. Or maybe you&apos;d just like to chat about our
            organisations and what we&apos;re doing for our members? Whatever
            the reason, we&apos;d love for you to meet your local rep.
          </p>
          <Collapse accordion>
            <Panel header="Find a Street Rep" key="1">
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={rep => (
                  <List.Item>
                    <List.Item.Meta
                      title={rep.name}
                      description={rep.companyName}
                    />
                    {`${rep.companyAddress.addressLine1}, ${rep.companyAddress.addressLine2}, ${rep.companyAddress.city}, ${rep.companyAddress.postcode}`}
                  </List.Item>
                )}
              />
              ,
            </Panel>
          </Collapse>
          <p className="mt3">
            Why not help to make your community stronger by becoming a street
            rep for your local area?
          </p>
          <Collapse accordion>
            <Panel header="Become a Street Rep" key="1">
              <p>
                We&apos;d love for you to help business owners in your area by
                becoming one of our Street Reps. If you have any questions about
                the role you can speak to one of our existing reps, who you can
                find in the list above.
              </p>
              <Button>I&apos;m ready! Make me a Street Rep</Button>
            </Panel>
          </Collapse>
        </div>
      </div>
    </article>
  );
}
