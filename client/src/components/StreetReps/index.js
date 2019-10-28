import React, { useEffect } from "react";
import { Collapse, List, Button, message } from "antd";
import useFetch from "../../hooks/useFetch";
import useApiCallback from "../../hooks/useApiCallback";

const { Panel } = Collapse;

export default function StreetReps() {
  const [
    { isError: isRepsDataError, isLoading: isRepsDataLoading, data: repsData },
  ] = useFetch("api/reps");
  const [
    { isError: isRequestStreetRepError, data: requestStreetRepResponse },
    requestStreetRep,
  ] = useApiCallback("post", "api/reps");
  useEffect(() => {
    if (isRequestStreetRepError) {
      return message.error(
        "There was an error processing your request. Please try again later"
      );
    }
  }, [isRequestStreetRepError]);
  useEffect(() => {
    if (isRepsDataError) {
      return message.error(
        "Sorry, we're having trouble retrieving the list of Street Reps for you. Please try again later."
      );
    }
  }, [isRepsDataError]);
  useEffect(() => {
    if (requestStreetRepResponse) {
      return message.success(requestStreetRepResponse.msg);
    }
  }, [requestStreetRepResponse]);
  const showOnlyRepsWithLocationDetails = reps =>
    reps && reps.filter(rep => rep.companyName && rep.companyAddress);
  return (
    <article className="vh-100 dt w-100 bg-white pv5">
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
                loading={isRepsDataLoading}
                itemLayout="horizontal"
                dataSource={showOnlyRepsWithLocationDetails(repsData)}
                renderItem={rep => (
                  <List.Item>
                    <List.Item.Meta
                      title={rep.name}
                      description={rep.companyName || "No Business Name Given"}
                    />
                    {Object.keys(rep.companyAddress).map(
                      (part, i) =>
                        `${i > 0 ? ", " : ""}${rep.companyAddress[part]}`
                    )}
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
              <p>
                By requesting to become a Street Rep, you agree to the Street Rep terms and conditions</p>
              <Button
                onClick={e => {
                  e.preventDefault();
                  requestStreetRep();
                }}
              >
                I&apos;m ready! Make me a Street Rep
              </Button>
            </Panel>
          </Collapse>
        </div>
      </div>
    </article>
  );
}
