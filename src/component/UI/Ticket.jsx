import React from 'react';
import Card from 'react-bootstrap/Card';
import classes from './Ticket.module.css';
import ticketIcon from '../../assets/task_list/ticket_icon.png';
import highArrowIcon from '../../assets/task_list/high_arrow.png';
import commentIcon from '../../assets/task_list/comment.png';

const Ticket = (props) => {
  const {
    id,
    title,
    priority,
    profileImage,
    count,
    onTicketDetailsHandler,
    onTicketStatusUpdate,
  } = props;
  let task_priority;

  if (priority === 1) {
    task_priority = 'High';
  } else if (priority === 2) {
    task_priority = 'Medium';
  } else {
    task_priority = 'low';
  }
  return (
    <div className="background mt-3">
      <Card>
        <Card.Body className={classes.ticket_Body}>
          <div className={classes.ticket_row}>
            <div className={classes.ticket_item}>
              <img src={ticketIcon} alt="ticket_icon" />
              <p>{id}</p>
            </div>
            <div className={classes.ticket_item}>
              <img src={highArrowIcon} alt="arrow_icon" />
              <p>{task_priority}</p>
            </div>
          </div>

          <div className={classes.taskname}>
            <p
              onClick={() => {
                onTicketDetailsHandler(2410);
              }}
            >
              {title}
            </p>
          </div>

          <div className={classes.profile_row}>
            <div>
              <img
                className={classes.profile_pic}
                src={`https://crm.creativebuffer.com/storage/uploads/image/${profileImage}`}
                alt="profile"
              />
            </div>
            <div>
              <img
                className={classes.commentIcon}
                src={commentIcon}
                alt="comment"
              />
              <span>{count}</span>
            </div>
          </div>

          <div>
            <select
              className={classes.ticket_status}
              onChange={(event) => {
                onTicketStatusUpdate(2410, event.target.value);
              }}
            >
              <option value="1">Todo</option>
              <option value="2">In Progress</option>
              <option value="3">Testing</option>
              <option value="4">Complete</option>
            </select>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Ticket;
