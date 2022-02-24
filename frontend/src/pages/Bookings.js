import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Spinner from "../components/SVG/Spinner";
import classes from "./Bookings.module.scss";
import BookingItem from "../components/BookingList/BookingItem";

// Load event
const LOAD_BOOKINGS = gql`
  query {
    bookings {
      _id
      event {
        _id
        title
        description
        date
        price
        createdBy {
          email
        }
      }
    }
  }
`;

// Load event
const CANCEL_BOOKING = gql`
  mutation cancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id
      title
      description
      date
      price
      createdBy {
        email
      }
    }
  }
`;

function Bookings() {
  const { data: bookingsData, loading, refetch } = useQuery(LOAD_BOOKINGS);
  const [
    cancelBooking,
    { data: canceledBookingData, loading: cancelBookingLoading },
  ] = useMutation(CANCEL_BOOKING);

  useEffect(() => {
    refetch();
  }, [loading, cancelBookingLoading]);

  const cancelBookingHandler = (bookingId) => {
    cancelBooking({
      variables: {
        bookingId,
      },
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className={classes.BookingsList}>
      {bookingsData && bookingsData.bookings && bookingsData.bookings.length > 0
        ? bookingsData.bookings.map((booking) => {
            return (
              <BookingItem
                bookingData={booking}
                cancelBooking={cancelBookingHandler}
              />
            );
          })
        : "No Bookings"}
    </div>
  );
}

export default Bookings;
