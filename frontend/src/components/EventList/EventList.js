import React, { Fragment } from "react";
import EventItem from "./EventItem/EventItem";
import classes from "./EventList.module.scss";

function EventList({ eventsData, userId }) {
  return (
    <div className={classes.EventsSection}>
      <ul className={classes.Event}>
        {eventsData.events.map((eventData, index) => {
          return (
            <Fragment>
              <EventItem eventData={eventData} key={index} />
              {userId === eventData.createdBy._id && (
                <em>Your are the owner</em>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default EventList;
