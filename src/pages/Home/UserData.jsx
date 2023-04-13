import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Ticket from '../../component/UI/Ticket';
import classes from './UserData.module.css';

const UserData = () => {
  return (
    <Container fluid className={classes.tab}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="third">
        <Row>
          <Col>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="third" className={classes.tab_text}>
                  To Do (5)
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="forth" className={classes.tab_text}>
                  In Progress (3)
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row className={classes.ticket_bg}>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="third">
                <Ticket />
                <Ticket />
                <Ticket />
              </Tab.Pane>
              <Tab.Pane eventKey="forth">
                <Ticket />
                <Ticket />
                <Ticket />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default UserData;
