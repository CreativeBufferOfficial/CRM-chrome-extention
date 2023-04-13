import React from 'react';
import classes from './Homepage.module.css';
import logo from '../../assets/task_list/top_logo.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import UserData from './UserData';

const Homepage = () => {
  return (
    <Container className={classes.main}>
      <Row>
        <Col>
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
        <Col>
          <div>
            <select class="ui dropdown">
              <option value="">UserName</option>
              <option value="1">Profile</option>
              <option value="0">Logout</option>
            </select>
          </div>
        </Col>
      </Row>

      <Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="first" className={classes.tab_text}>
                    Today Task's
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col>
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="second" className={classes.tab_text}>
                    This Month Task's
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <UserData />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <UserData />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Row>
    </Container>
  );
};

export default Homepage;
