import React from "react";
import EventItem from "./EventItem/EventItem";
import classes from "./EventList.module.scss";

function EventList({ eventsData, userId, canBook, bookEvent }) {
  return (
    <div className={classes.EventsSection}>
      {eventsData.length > 0 ? (
        <ul className={classes.Event}>
          {eventsData.map((eventData, index) => {
            return (
              <EventItem
                eventData={eventData}
                key={index}
                userId={userId}
                canBook={canBook}
                bookEvent={bookEvent}
              />
            );
          })}
        </ul>
      ) : (
        <p className={classes.NoEventText}>No events</p>
      )}
    </div>
  );
}

export default EventList;
