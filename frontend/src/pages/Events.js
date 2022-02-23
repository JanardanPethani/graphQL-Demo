import React, {
  Fragment,
  useRef,
  useState,
  useContext,
  useEffect,
} from "react";
import Modal from "../components/Modal/Modal";
import classes from "./Events.module.scss";
import { gql, useMutation, useQuery } from "@apollo/client";
import AuthContext from "../context/auth-context";
import Spinner from "../components/SVG/Spinner";
import EventList from "../components/EventList/EventList";

// Create event
const CREATE_EVENT = gql`
  mutation createEvent(
    $title: String!
    $description: String!
    $price: Float!
    $date: String!
    $createdBy: ID!
  ) {
    createEvent(
      eventInput: {
        title: $title
        description: $description
        price: $price
        date: $date
        createdBy: $createdBy
      }
    ) {
      _id
      title
      description
      price
      date
      createdBy {
        email
      }
    }
  }
`;

// Load event
const LOAD_EVENTS = gql`
  query {
    events {
      _id
      title
      description
      price
      date
      createdBy {
        _id
        email
      }
    }
  }
`;

// User specific event
const LOAD_USER_EVENT = gql`
  query {
    userEvents {
      _id
      title
      description
      price
      date
      createdBy {
        _id
        email
      }
    }
  }
`;

// User specific event
const OTHER_USER_EVENT = gql`
  query {
    otherEvents {
      _id
      title
      description
      price
      date
      createdBy {
        _id
        email
      }
    }
  }
`;

// Book an event
const BOOK_EVENT = gql`
  mutation bookEvent($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id
      event {
        _id
      }
      user {
        _id
      }
    }
  }
`;

function Events() {
  const title = useRef(null);
  const description = useRef(null);
  const price = useRef(null);
  const date = useRef(null);
  const [isModalClosed, setIsClosed] = useState(true);

  const [createEvent, { data }] = useMutation(CREATE_EVENT);
  const [
    bookEvent,
    { loading: bookLoading, data: bookedData, errors: bookError },
  ] = useMutation(BOOK_EVENT);

  const { data: eventsData, loading, refetch } = useQuery(LOAD_EVENTS);
  const { data: userEventsData, loading: userEventsLoading } =
    useQuery(LOAD_USER_EVENT);
  const { data: otherEventsData, loading: otherEventsLoading } =
    useQuery(OTHER_USER_EVENT);

  const authContext = useContext(AuthContext);

  const creatEventHandler = () => {
    setIsClosed(false);
  };

  const closeHandler = () => {
    setIsClosed(true);
  };

  const confirmHandler = () => {
    if (
      title.current.value &&
      description.current.value &&
      price.current.value &&
      date.current.value
    ) {
      createEvent({
        variables: {
          title: title.current.value.trim(),
          description: description.current.value.trim(),
          price: parseFloat(price.current.value.trim()),
          date: new Date(date.current.value).toISOString(),
          createdBy: authContext.userId,
        },
      });
    }
    setIsClosed(true);
  };

  const bookEventHandler = (eventId) => {
    bookEvent({
      variables: {
        eventId,
      },
    })
      .then((res) => {
        if (res.data?.bookEvent) {
          alert("Event Booked");
        }
      })
      .catch((err) => {
        alert("Already Booked");
      });
  };

  if (loading || userEventsLoading || otherEventsLoading) return <Spinner />;

  return (
    <Fragment>
      {!isModalClosed && (
        <Modal
          title="Add Event"
          confirmHandler={confirmHandler}
          closeHandler={closeHandler}
        >
          <form className={classes.Form} onSubmit={confirmHandler}>
            <div className={classes.FormControl}>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={title} />
            </div>
            <div className={classes.FormControl}>
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={price} />
            </div>
            <div className={classes.FormControl}>
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={date} />
            </div>
            <div className={classes.FormControl}>
              <label htmlFor="description">Description</label>
              <textarea
                type="area"
                id="description"
                rows={4}
                ref={description}
              />
            </div>
          </form>
        </Modal>
      )}
      {authContext.token && (
        <div className={classes.FormActions}>
          <button type="button" onClick={creatEventHandler}>
            Create an event
          </button>
        </div>
      )}

      {!userEventsData && !otherEventsData && eventsData && (
        <EventList eventsData={eventsData.events} userId={authContext.userId} />
      )}

      {userEventsData && (
        <div className={classes.EventsSec}>
          <h4>Your events</h4>
          <EventList
            eventsData={userEventsData.userEvents}
            userId={authContext.userId}
          />
        </div>
      )}

      {otherEventsData && (
        <div className={classes.EventsSec}>
          <h4>Other events</h4>
          <EventList
            eventsData={otherEventsData.otherEvents}
            userId={authContext.userId}
            bookEvent={bookEventHandler}
            canBook
          />
        </div>
      )}
    </Fragment>
  );
}

export default Events;
