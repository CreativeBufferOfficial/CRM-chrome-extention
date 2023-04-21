import React, { useRef, useState, useEffect } from 'react';
import Ticket from '../../component/UI/Ticket';
import classes from './UserData.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadUserTodo,
  // loadUserInProccess,
  updateTicketStatus,
} from '../../actions/UserAction';
import { ticketDetailsHandler } from '../../utlis/Helper';
import Loader from '../../component/UI/Loader';

const UserData = ({ today, fromDate, toDate }) => {
  const dispatch = useDispatch();
  const { loading, ticketTodo } = useSelector((state) => state.ticketTodo);
  // const { loadingInProccess, ticketInProccess } = useSelector(
  //   (state) => state.ticketInProccess
  // );
  const { isUpdated } = useSelector((state) => state.status);
  const [todo, setTodo] = useState(true);
  const [process, setInProcess] = useState(false);

  const [todoCount, setTodoCount] = useState();
  const [inProcessCount, setInProcessCount] = useState();

  useEffect(() => {
    // if (today !== undefined) {
    //   dispatch(loadUserTodo(1, today));
    //   dispatch(loadUserInProccess(2, today));
    // }

    // if (fromDate !== undefined && toDate !== undefined) {
    //   dispatch(loadUserTodo(1, null, fromDate, toDate));
    //   dispatch(loadUserInProccess(2, null, fromDate, toDate));
    // }

    if (todo === true) {
      // console.log(`Date${today}`);
      if (today !== undefined) {
        // console.log('todo today ');
        dispatch(loadUserTodo(1, today));
      } else if (fromDate !== undefined && toDate !== undefined) {
        // console.log('todo month ');
        dispatch(loadUserTodo(1, null, fromDate, toDate));
      }
    } else if (process === true) {
      // console.log(`Date${today}`);

      if (today !== undefined) {
        // console.log('inProcess Today');

        dispatch(loadUserTodo(2, today));
      } else if (fromDate !== undefined && toDate !== undefined) {
        // console.log('inProcess month');
        dispatch(loadUserTodo(2, null, fromDate, toDate));
      }
    }
  }, [dispatch, todo, process, today, fromDate, toDate, isUpdated]);

  const todoHandler = () => {
    setTodo(true);
    setInProcess(false);
    setInProcessCount((prevState) =>
      !process ? prevState : ticketTodo.data.length
    );
    // setInProcessCount((prevState) =>
    //   !process ? prevState : ticketInProccess.data.length
    // );
  };

  const processHandler = () => {
    setInProcess(true);
    setTodo(false);
    setTodoCount((prevState) => (!todo ? prevState : ticketTodo.data.length));
  };

  const updateTicket = (ticket_id, status) => {
    dispatch(updateTicketStatus(ticket_id, status));
  };

  return (
    <>
      <div className={classes.ticket_main}>
        <div className={classes.status_bar}>
          <p onClick={todoHandler} className={classes.todo}>
            <span className={todo ? classes.edge : ''}></span> Todo
            <span> {todo ? ticketTodo?.data?.length : todoCount}</span>
          </p>
          <p onClick={processHandler} className={classes.inProcess}>
            In Process{' '}
            <span>{process ? ticketTodo?.data?.length : inProcessCount}</span>
            <span className={process ? classes.edge2 : ''}></span>
          </p>
        </div>

        <div
          className={
            ticketTodo && ticketTodo?.data?.length > 0
              ? classes.all_ticket
              : classes.no_ticket
          }
        >
          {loading ? (
            <Loader />
          ) : ticketTodo && ticketTodo?.data?.length > 0 ? (
            ticketTodo?.data?.map((element) => {
              return (
                <div key={element.id}>
                  <Ticket
                    onTicketDetailsHandler={ticketDetailsHandler}
                    onTicketStatusUpdate={updateTicket}
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
              No ticket in your {todo ? 'todo' : 'In Process'} list
            </p>
          )}
        </div>

        {/* TODO: */}
        {/* {todo ? (
          loadingTodo ? (
            <Loader />
          ) : ticketTodo && ticketTodo?.data?.length > 0 ? (
            ticketTodo?.data?.map((element) => {
              return (
                <div className={classes.all_ticket} key={element.id}>
                  <Ticket
                    onTicketDetailsHandler={ticketDetailsHandler}
                    onTicketStatusUpdate={updateTicket}
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
              No ticket in your {todo ? 'todo' : 'In Process'} list
            </p>
          )
        ) : loadingInProccess ? (
          <Loader />
        ) : ticketInProccess && ticketInProccess?.data?.length > 0 ? (
          ticketInProccess?.data?.map((element) => {
            return (
              <div className={classes.all_ticket} key={element.id}>
                <Ticket
                  onTicketDetailsHandler={ticketDetailsHandler}
                  onTicketStatusUpdate={updateTicket}
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
            No ticket in your {todo ? 'todo' : 'In Process'} list
          </p>
        )} */}
      </div>
    </>
  );
};

export default UserData;
