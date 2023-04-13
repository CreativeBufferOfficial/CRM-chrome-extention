import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import classes from './Ticket.module.css';
import ticketIcon from '../../assets/task_list/ticket_icon.png';
import highArrowIcon from '../../assets/task_list/high_arrow.png';
import userIcon from '../../assets/task_list/user.png';
import commentIcon from '../../assets/task_list/comment.png';

const Ticket = () => {
  return (
    <div className="background mt-3">
      <Card>
        <Card.Body className={classes.ticket_Body}>
          <div className={classes.ticket_row}>
            <div className={classes.ticket_item}>
              <img src={ticketIcon} alt="ticket_icon" />
              <p>2029</p>
            </div>
            <div className={classes.ticket_item}>
              <img src={highArrowIcon} alt="arrow_icon" />
              <p>High</p>
            </div>
          </div>

          <div>
            <p>Doctor Home Screen</p>
          </div>

          <div className={classes.profile_row}>
            <div>
              <img src={userIcon} alt="profile" />
            </div>
            <div>
              <img
                className={classes.commentIcon}
                src={commentIcon}
                alt="comment"
              />
              <span>3</span>
            </div>
          </div>

          <div>
            <select className={classes.ticket_status}>
              <option value="">Todo</option>
              <option value="1">In Progress</option>
              <option value="0">Development Complete</option>
            </select>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Ticket;
