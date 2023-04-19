import React, { useRef, useState, useEffect } from 'react';
import Ticket from '../../component/UI/Ticket';
import classes from './UserData.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserTodo, updateTicketStatus } from '../../actions/UserAction';
import { ticketDetailsHandler } from '../../utlis/Helper';

const UserData = ({ today, fromDate, toDate }) => {
  const dispatch = useDispatch();
  const { ticket } = useSelector((state) => state.ticket);
  const [todo, setTodo] = useState(true);
  const [process, setInProcess] = useState(false);

  console.log(`Inside UserData ${ticket}`);

  useEffect(() => {
    if (todo === true) {
      console.log(`Date${today}`);
      if (today !== undefined) {
        console.log('todo today ');
        dispatch(loadUserTodo(1, today));
      } else if (fromDate !== undefined && toDate !== undefined) {
        console.log('todo month ');
        dispatch(loadUserTodo(1, null, fromDate, toDate));
      }
    } else if (process === true) {
      console.log(`Date${today}`);

      if (today !== undefined) {
        console.log('inProcess Today');

        dispatch(loadUserTodo(2, today));
      } else if (fromDate !== undefined && toDate !== undefined) {
        console.log('inProcess month');
        dispatch(loadUserTodo(2, null, fromDate, toDate));
      }
    }
  }, [dispatch, todo, process, today, fromDate, toDate]);

  const todoHandler = () => {
    setTodo(true);
    setInProcess(false);
  };

  const processHandler = () => {
    setTodo(false);
    setInProcess(true);
  };

  const updateTicket = (ticket_id, status) => {
    console.log(ticket_id, status);
    dispatch(updateTicketStatus(ticket_id, status));
  };

  console.log('ticket >>>', ticket);

  return (
    <>
      <div className={classes.ticket_main}>
        <div className={classes.status_bar}>
          <p onClick={todoHandler} className={classes.todo}>
            <span className={todo ? classes.edge : ''}></span> Todo
            <span> {todo ? ticket?.data?.length : 0}</span>
          </p>
          <p onClick={processHandler} className={classes.inProcess}>
            In Process <span>{process ? ticket?.data?.length : 0}</span>
            <span className={process ? classes.edge2 : ''}></span>
          </p>
        </div>

        {ticket &&
          ticket?.data?.length > 0 &&
          ticket?.data?.map((element) => {
            return (
              <div className={classes.all_ticket}>
                <Ticket
                  key={element.id}
                  onTicketDetailsHandler={ticketDetailsHandler}
                  onTicketStatusUpdate={updateTicket}
                  id={element.id}
                  title={element.title}
                  priority={element.tast_priority}
                  profileImage={element.user.image.profile_image}
                  count={element.comments_count}
                />
              </div>
            );
          })}
        {/* <Ticket
          onTicketDetailsHandler={ticketDetailsHandler}
          onTicketStatusUpdate={updateTicket}
        /> */}
      </div>
    </>
  );
};

export default UserData;
