import React from "react";
import classes from "./EventItem.module.scss";

function EventItem({ eventData }) {
  return (
    <li className={classes.EventItem}>
      <div className={classes.EventItemData}>
        <div className={classes.EventTag}>Title:</div>
        <div className={classes.EventTagData}>{eventData.title}</div>
      </div>
      <div className={classes.EventItemData}>
        <div className={classes.EventTag}>Description:</div>
        <div className={classes.EventTagData}>{eventData.description}</div>
      </div>
      <div className={classes.EventItemData}>
        <div className={classes.EventTag}>Price:</div>
        <div className={classes.EventTagData}>{eventData.price}</div>
      </div>
      <div className={classes.EventItemData}>
        <div className={classes.EventTag}>Date: </div>
        <div className={classes.EventTagData}>
          {new Date(eventData.date).toLocaleString()}
        </div>
      </div>
      <div className={classes.EventItemData}>
        <div className={classes.EventTag}>By:</div>
        <div className={classes.EventTagData}>{eventData.createdBy.email}</div>
      </div>
    </li>
  );
}

export default EventItem;
