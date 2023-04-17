import React, { useEffect, useRef } from 'react';
import classes from './Homepage.module.css';
import logo from '../../assets/task_list/top_logo.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import UserData from './UserData';
import { logout, clearErrors, loadUserTodo } from '../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../../utlis/auth';
import { useNavigate } from 'react-router-dom';
import { removeAuth } from '../../utlis/auth';
import { apiUrls } from '../../utlis/ApiUrl';
import { defaultConfig } from '../../utlis/config';
import userIcon from '../../assets/task_list/user_icon.png';
const Homepage = () => {
  const { error, user } = useSelector((state) => state.user);
  const { userTicket } = useSelector((state) => state.ticket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  console.log(user);
  console.log(` user tickets${JSON.stringify(userTicket)}`);
  // console.log(`user ${JSON.stringify(user.access_token)}`);
  const id = user?.id;
  const token = user?.access_token;
  console.log(token);
  setSession(token);

  const isloggedIn = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
    if (isloggedIn === null) {
      navigate('/');
    }
    dispatch(loadUserTodo());
  }, [dispatch, error, navigate, isloggedIn]);

  console.log(`Home Page ${error} `);

  const logoutHandler = (event) => {
    const action = event.target.value;
    console.log('htting logout handler');
    console.log(action);
    if (action === 'logout') {
      dispatch(logout());
      removeAuth();
    }
    if (action === 'profile') {
      // const url = `https://crm.creativebuffer.com/profile?${id}`;
      const API_ROOT = defaultConfig.baseAPIUrl;
      const url = API_ROOT + apiUrls.profile + id;
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add(classes.shiftToNeutral);
      switcherTab.current.classList.remove(classes.shiftToRight);

      registerTab.current.classList.remove(classes.shiftToNeutralForm);
      loginTab.current.classList.remove(classes.shiftToLeft);
    }

    if (tab === 'register') {
      switcherTab.current.classList.add(classes.shiftToRight);
      switcherTab.current.classList.remove(classes.shiftToNeutral);

      registerTab.current.classList.add(classes.shiftToNeutralForm);
      loginTab.current.classList.add(classes.shiftToLeft);
    }
  };

  return (
    <>
      <div className={classes.main}>
        <div div className={classes.header}>
          <div className={classes.home_logo}>
            <img src={logo} alt="logo" />
          </div>

          <div>
            <select onChange={logoutHandler}>
              <option value="username">UserName</option>
              <option value="profile">Profile</option>
              <option value="logout">Logout</option>
            </select>
          </div>
        </div>

        <div className={classes.LoginSignUpContainer}>
          <div className={classes.LoginSignUpBox}>
            <div>
              <div className={classes.login_signUp_toggle}>
                <p onClick={(e) => switchTabs(e, 'login')}>Today</p>
                <p onClick={(e) => switchTabs(e, 'register')}>This Month</p>
              </div>
              <button ref={switcherTab}></button>
            </div>

            <div>
              <div className={classes.loginForm} ref={loginTab}>
                <UserData />
              </div>
              <div className={classes.signUpForm} ref={registerTab}>
                <UserData />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <Container className={classes.main}>
    //   <Row>
    //     <Col>
    //       <div className={classes.home_logo}>
    //         <img src={logo} alt="logo" />
    //       </div>
    //     </Col>
    //     <Col>
    //       <div>
    //         <select onChange={logoutHandler}>
    //           <option value="">UserName</option>
    //           <option value="profile">Profile</option>
    //           <option value="logout">Logout</option>
    //         </select>
    //       </div>
    //     </Col>
    //   </Row>

    //   <Row>
    //     <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    //       <Row>
    //         <Col>
    //           <Nav>
    //             <Nav.Item>
    //               <Nav.Link eventKey="first" className={classes.text}>
    //                 Today Task's
    //               </Nav.Link>
    //             </Nav.Item>
    //           </Nav>
    //         </Col>
    //         <Col className={classes.tab_today}>
    //           <Nav variant="pills">
    //             <Nav.Item>
    //               <Nav.Link eventKey="second">This Month Task's</Nav.Link>
    //             </Nav.Item>
    //           </Nav>
    //         </Col>
    //       </Row>
    //       <Row>
    //         <Col sm={6}>
    //           <Tab.Content>
    //             <Tab.Pane eventKey="first">
    //               <UserData />
    //             </Tab.Pane>
    //             <Tab.Pane eventKey="second">
    //               <UserData />
    //             </Tab.Pane>
    //           </Tab.Content>
    //         </Col>
    //       </Row>
    //     </Tab.Container>
    //   </Row>
    // </Container>
  );
};

export default Homepage;
