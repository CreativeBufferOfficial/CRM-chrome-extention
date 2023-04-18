import React, { useRef, useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';
// import Tab from 'react-bootstrap/Tab';
import Ticket from '../../component/UI/Ticket';
import classes from './UserData.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserTodo, updateTicketStatus } from '../../actions/UserAction';
import { defaultConfig } from '../../utlis/config';
import { apiUrls } from '../../utlis/ApiUrl';

const UserData = ({ today, fromDate, toDate }) => {
  const dispatch = useDispatch();
  const { ticket } = useSelector((state) => state.ticket);
  const [todo, setTodo] = useState(true);
  const [process, setInProcess] = useState(false);

  // console.log(`Inside UserData ${JSON.stringify(ticket)}`);
  // console.log(`Inside UserData ${JSON.parse(JSON.stringify(ticket))}`);

  // if (ticket !== null) {
  // console.log(ticket && ticket.data[0]?.deadline);
  // }
  // const array = [...ticket];
  // console.log(array);

  useEffect(() => {
    // dispatch(loadUserTodo(1, '2023-04-18'));

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

  const ticketDetailsHandler = (ticket_id) => {
    const API_ROOT = defaultConfig.baseAPIUrl;
    const url = API_ROOT + apiUrls.ticketDetails + ticket_id;
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const updateTicket = (ticket_id, status) => {
    console.log(ticket_id, status);
    dispatch(updateTicketStatus(ticket_id, status));
  };

  if (ticket !== undefined) {
    console.log(ticket.data);
  }
  return (
    <>
      <div>
        <div className={classes.status_bar}>
          <p onClick={todoHandler} className={classes.todo}>
            <span className={todo ? classes.edge : ''}></span> Todo
            <span>2</span>
          </p>
          <p onClick={processHandler} className={classes.inProcess}>
            In Process <span>2</span>
            <span className={process ? classes.edge2 : ''}></span>
          </p>
        </div>

        <div className={classes.all_ticket}>
          {/* {ticket &&
            ticket.data.map((element) => {
              return (
                <Ticket
                  key={element.id}
                  onTicketDetailsHandler={ticketDetailsHandler}
                  onTicketStatusUpdate={updateTicket}
                  id={element.id}
                  title={element.title}
                />
              );
            })} */}
          <Ticket
            onTicketDetailsHandler={ticketDetailsHandler}
            onTicketStatusUpdate={updateTicket}
          />
        </div>
      </div>
    </>
    // <div className={classes.LoginSignUpContainer}>
    //   <div className={classes.LoginSignUpBox}>
    //     <div>
    //       <div className={classes.login_signUp_toggle}>
    //         <p onClick={(e) => switchTabs(e, 'login')}>Todo</p>
    //         <p onClick={(e) => switchTabs(e, 'register')}>In Process</p>
    //       </div>
    //       <button ref={switcherTab}></button>
    //     </div>
    //     <form className={classes.loginForm} ref={loginTab}>
    //       hello
    //     </form>
    //     <form className={classes.signUpForm} ref={registerTab}>
    //       world
    //     </form>
    //   </div>
    // </div>

    // <Container fluid className={classes.tab}>
    //   <Tab.Container id="left-tabs-example" defaultActiveKey="third">
    //     <Row>
    //       <Col>
    //         <Nav variant="pills">
    //           <Nav.Item>
    //             <Nav.Link eventKey="third" className={classes.tab_text}>
    //               To Do (5)
    //             </Nav.Link>
    //           </Nav.Item>
    //         </Nav>
    //       </Col>
    //       <Col>
    //         <Nav variant="pills">
    //           <Nav.Item>
    //             <Nav.Link eventKey="forth" className={classes.tab_text}>
    //               In Progress (3)
    //             </Nav.Link>
    //           </Nav.Item>
    //         </Nav>
    //       </Col>
    //     </Row>
    //     <Row className={classes.ticket_bg}>
    //       <Col sm={12}>
    //         <Tab.Content>
    //           <Tab.Pane eventKey="third">
    //             <Ticket />
    //             <Ticket />
    //             <Ticket />
    //             <Ticket />
    //             <Ticket />
    //           </Tab.Pane>
    //           <Tab.Pane eventKey="forth">
    //             <Ticket />
    //             <Ticket />
    //             <Ticket />
    //             <Ticket />
    //             <Ticket />
    //           </Tab.Pane>
    //         </Tab.Content>
    //       </Col>
    //     </Row>
    //   </Tab.Container>
    // </Container>
  );
};

export default UserData;
