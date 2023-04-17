import React, { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Ticket from '../../component/UI/Ticket';
import classes from './UserData.module.css';

const UserData = () => {
  return (
    <>
      <div>
        <div className={classes.status_bar}>
          <p>Todo</p>
          <p>In Process</p>
        </div>

        <div>
          <Ticket />
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
