import React, { Fragment, useRef, useState, useContext } from "react";
import Modal from "../components/Modal/Modal";
import classes from "./Events.module.scss";
import { gql, useMutation, useQuery } from "@apollo/client";
import AuthContext from "../context/auth-context";

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

function Events() {
  const title = useRef(null);
  const description = useRef(null);
  const price = useRef(null);
  const date = useRef(null);
  const [isModalClosed, setIsClosed] = useState(true);
  const [createEvent, { data, loading, error }] = useMutation(CREATE_EVENT);
  const {
    data: eventsData,
    loading: eventsLoading,
    error: eventsErr,
  } = useQuery(LOAD_EVENTS);

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

      {eventsData && (
        <div className={classes.EventsSection}>
          {eventsData.events.map((eventData, index) => {
            return (
              <ul className={classes.Event} key={index}>
                <li>
                  <div className={classes.EventTag}>Title:</div>
                  <div className={classes.EventTagData}> {eventData.title}</div>
                </li>
                <li>
                  <div className={classes.EventTag}>Description:</div>
                  <div className={classes.EventTagData}>
                    {eventData.description}
                  </div>
                </li>
                <li>
                  <div className={classes.EventTag}>Price:</div>
                  <div className={classes.EventTagData}>{eventData.price}</div>
                </li>
                <li>
                  <div className={classes.EventTag}>Date: </div>
                  <div className={classes.EventTagData}>
                    {new Date(eventData.date).toLocaleString()}
                  </div>
                </li>
                <li>
                  <div className={classes.EventTag}>By:</div>
                  <div className={classes.EventTagData}>
                    {eventData.createdBy.email}
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </Fragment>
  );
}

export default Events;
