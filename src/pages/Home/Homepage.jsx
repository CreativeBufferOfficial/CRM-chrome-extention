import React from 'react';
import classes from './Home.module.css';
import logo from '../../assets/img/icon-128.png';
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
    <div>
      <Container className={classes.main}>
        <Row>
          <Col>
            <img src={logo} className="App-logo" alt="logo" />
          </Col>
          <Col>
            <div>
              <DropdownButton
                id="dropdown-basic-button"
                title="Dropdown button"
              >
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>

        <Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={6}>
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="first" className={classes.tab_text}>
                      Today Task's
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={6}>
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
              <Col sm={12}>
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
    </div>
  );
};

export default Homepage;
