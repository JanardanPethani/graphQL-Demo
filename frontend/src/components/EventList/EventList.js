import React, { Fragment } from "react";
import EventItem from "./EventItem/EventItem";
import classes from "./EventList.module.scss";

function EventList({ eventsData, userId }) {
  return (
    <div className={classes.EventsSection}>
      <ul className={classes.Event}>
        {eventsData.events.map((eventData, index) => {
          return (
            <EventItem eventData={eventData} key={index} userId={userId} />
          );
        })}
      </ul>
    </div>
  );
}

export default EventList;
