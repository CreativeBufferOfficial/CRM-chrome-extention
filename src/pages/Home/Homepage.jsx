import React, { useEffect } from 'react';
import classes from './Homepage.module.css';
import logo from '../../assets/task_list/top_logo.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import UserData from './UserData';
import { logout, clearErrors } from '../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';

const Homepage = () => {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  console.log(`Home Page ${error} `);
  const logoutHandler = (event) => {
    const action = event.target.value;
    console.log('htting logout handler');
    console.log(action);
    if (action === 'logout') {
      dispatch(logout());
    }
  };

  return (
    <Container className={classes.main}>
      <Row>
        <Col>
          <div className={classes.home_logo}>
            <img src={logo} alt="logo" />
          </div>
        </Col>
        <Col>
          <div>
            <select onChange={logoutHandler}>
              <option value="">UserName</option>
              <option value="profile">Profile</option>
              <option value="logout">Logout</option>
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
