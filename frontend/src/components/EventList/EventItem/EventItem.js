import React, { Fragment, useState } from "react";
import Modal from "../../Modal/Modal";
import classes from "./EventItem.module.scss";

function EventItem({ eventData, userId }) {
  const [isModalClosed, setIsClosed] = useState(true);
  const openDetails = () => {
    setIsClosed(false);
  };
  const closeHandler = () => {
    setIsClosed(true);
  };
  return (
    <Fragment>
      {!isModalClosed && (
        <Modal title="Event Details" closeHandler={closeHandler}>
          <div className={classes.ModalItemData}>
            <div className={classes.EventTag}>Description:</div>
            <div className={classes.EventTagData}>{eventData.description}</div>
          </div>
          <div className={classes.ModalItemData}>
            <div className={classes.EventTag}>By:</div>
            <div className={classes.EventTagData}>
              {eventData.createdBy.email}
            </div>
          </div>
          <div className={classes.ModalItemData}>
            <div className={classes.EventTag}>Price:</div>
            <div className={classes.EventTagData}>{eventData.price}</div>
          </div>
        </Modal>
      )}
      <li className={classes.EventItem}>
        {userId === eventData.createdBy._id && (
          <div className={classes.OwnerText}>You are the owner</div>
        )}
        <div className={classes.EventItemData}>
          <div className={classes.EventTag}>Title:</div>
          <div className={classes.EventTagData}>{eventData.title}</div>
        </div>
        <div className={classes.EventItemData}>
          <div className={classes.EventTag}>Date: </div>
          <div className={classes.EventTagData}>
            {new Date(eventData.date).toLocaleString()}
          </div>
        </div>
        <div className={`${classes.EventItemData} ${classes.DetailsBtn}`}>
          <button onClick={openDetails}>More details</button>
        </div>
      </li>
    </Fragment>
  );
}

export default EventItem;
