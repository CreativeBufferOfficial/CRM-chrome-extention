import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import classes from './Ticket.module.css';

const Ticket = () => {
  return (
    <div>
      <div className="background mt-3">
        <Card>
          <Card.Body className={classes.ticket_Body}>
            <div className={classes.ticket_row}>
              <div>
                <p>2029</p>
              </div>
              <div>
                <p>High</p>
              </div>
            </div>
            <div>
              <p>Doctor Home Screen</p>
            </div>
            <div className={classes.ticket_row}>
              <div>
                <img src="#" alt="profile" />
              </div>
              <div>
                <img src="#" alt="comment" />
              </div>
            </div>
            <div>
              <DropdownButton
                id="dropdown-basic-button"
                title="Dropdown button"
                className={classes.ticket_dropdown}
              >
                <Dropdown.Item href="#/action-1">Todo</Dropdown.Item>
                <Dropdown.Item href="#/action-2">In Progress</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-3">
                  Development Completed
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Ticket;
