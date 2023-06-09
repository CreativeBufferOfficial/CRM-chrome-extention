import React, { useState, useEffect } from 'react';
import Ticket from '../../component/UI/Ticket';
import classes from './UserData.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, updateTicketStatus } from '../../actions/UserAction';
import { ticketDetailsHandler } from '../../utlis/Helper';
import Loader from '../../component/UI/Loader';

const UserData = ({ today, fromDate, toDate }) => {
  const dispatch = useDispatch();
  const { loadingTodo, ticketTodo } = useSelector((state) => state.ticketTodo);
  const { loadingInProcess, ticketInProccess } = useSelector(
    (state) => state.ticketInProccess
  );
  const { isUpdated } = useSelector((state) => state.status);
  const [todo, setTodo] = useState(true);
  const [process, setInProcess] = useState(false);

  useEffect(() => {
    if (today !== undefined) {
      dispatch(loadUser(1, today));
      dispatch(loadUser(2, today));
    }
    if (fromDate !== undefined && toDate !== undefined) {
      dispatch(loadUser(1, null, fromDate, toDate));
      dispatch(loadUser(2, null, fromDate, toDate));
    }
  }, [dispatch, todo, process, today, fromDate, toDate, isUpdated]);

  const todoHandler = () => {
    setTodo(true);
    setInProcess(false);
  };

  const processHandler = () => {
    setInProcess(true);
    setTodo(false);
  };

  const updateTicketHandler = (ticket_id, status) => {
    dispatch(updateTicketStatus(ticket_id, status));
  };

  return (
    <>
      <div className={classes.ticket_main}>
        <div className={classes.status_bar}>
          <p onClick={todoHandler} className={classes.todo}>
            <span className={todo ? classes.edge : ''}></span> Todo
            <span> {ticketTodo?.data?.length}</span>
          </p>
          <p onClick={processHandler} className={classes.inProcess}>
            In Process <span>{ticketInProccess?.data?.length}</span>
            <span className={process ? classes.edge2 : ''}></span>
          </p>
        </div>

        <div
          className={
            (ticketTodo && ticketTodo?.data?.length > 0) ||
            (ticketInProccess && ticketInProccess?.data?.length > 0)
              ? classes.all_ticket
              : classes.no_ticket
          }
        >
          {todo ? (
            loadingTodo ? (
              <Loader />
            ) : ticketTodo && ticketTodo?.data?.length > 0 ? (
              ticketTodo?.data?.map((element) => {
                return (
                  <div key={element.id}>
                    <Ticket
                      onTicketDetailsHandler={ticketDetailsHandler}
                      onTicketStatusUpdate={updateTicketHandler}
                      id={element.id}
                      title={element.title}
                      priority={element.tast_priority}
                      profileImage={element.user.image.profile_image}
                      count={element.comments_count}
                      status={element.status}
                    />
                  </div>
                );
              })
            ) : (
              <p className={classes.Emptymessage}>
                No ticket in your todo list
              </p>
            )
          ) : loadingInProcess ? (
            <Loader />
          ) : ticketInProccess && ticketInProccess?.data?.length > 0 ? (
            ticketInProccess?.data?.map((element) => {
              return (
                <div key={element.id}>
                  <Ticket
                    onTicketDetailsHandler={ticketDetailsHandler}
                    onTicketStatusUpdate={updateTicketHandler}
                    id={element.id}
                    title={element.title}
                    priority={element.tast_priority}
                    profileImage={element.user.image.profile_image}
                    count={element.comments_count}
                    status={element.status}
                  />
                </div>
              );
            })
          ) : (
            <p className={classes.Emptymessage}>
              No ticket in your In Process list
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserData;
