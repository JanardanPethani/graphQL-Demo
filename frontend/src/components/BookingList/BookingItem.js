import React from "react";
import classes from "./BookingItem.module.scss";

export default function BookingItem({ bookingData, cancelBooking }) {
  return (
    <div className={classes.BookingItem}>
      <div className={classes.BookingData}>
        <div className={classes.Tag}>Title:</div>
        <div>{bookingData.event.title}</div>
      </div>
      <div className={classes.BookingData}>
        <div className={classes.Tag}>Description:</div>
        <div>{bookingData.event.description}</div>
      </div>
      <div className={classes.BookingData}>
        <div className={classes.Tag}>Date:</div>
        <div>{new Date(bookingData.event.date).toLocaleString()}</div>
      </div>
      <div className={classes.BookingData}>
        <div className={classes.Tag}>Price:</div>
        <div>{bookingData.event.price}</div>
      </div>
      <button
        onClick={() => {
          cancelBooking(bookingData._id);
        }}
      >
        Cancel Booking
      </button>
    </div>
  );
}
