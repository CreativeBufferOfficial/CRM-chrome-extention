import React, { useEffect, useRef, useState } from 'react';
import classes from './Homepage.module.css';
import logo from '../../assets/task_list/top_logo.png';
import UserData from './UserData';
import { logout, clearErrors, loadUserTodo } from '../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../../utlis/auth';
import { useNavigate } from 'react-router-dom';
import { removeAuth } from '../../utlis/auth';
import { apiUrls } from '../../utlis/ApiUrl';
import { defaultConfig } from '../../utlis/config';
// import userIcon from '../../assets/task_list/user_icon.png';
const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state.user);
  const { ticket } = useSelector((state) => state.ticket);

  const todayTab = useRef(null);
  const monthTab = useRef(null);
  const switcherTab = useRef(null);
  const [todayTabActive, setTodayTabActive] = useState(true);
  const [monthTabActive, setMonthTabActive] = useState(false);

  // console.log(`User ${JSON.stringify(user)}`);

  // console.log(`user ${JSON.stringify(user.access_token)}`);

  //TODO: FIXME:
  const id = user?.id;
  const token = user?.access_token;
  // console.log(token);
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
    // dispatch(loadUserTodo());
  }, [dispatch, error, navigate, isloggedIn, todayTabActive, monthTabActive]);

  console.log(`Home Page ${error} `);

  // console.log(` user tickets${JSON.stringify(ticket)}`);
  // console.log(` user tickets${toString(ticket)}`);

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

  const getYear = (date) => {
    return date.getFullYear();
  };
  const formatmonth = (date) => {
    let month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
  };
  const formatDay = (date) => {
    let day = date.getDate();
    return day < 10 ? '0' + day : '' + day;
  };
  const today = new Date();
  let date =
    today.getFullYear() + '-' + formatmonth(today) + '-' + formatDay(today);
  // console.log('@@@@@@@');
  const switchTabs = (e, tab) => {
    if (tab === 'today') {
      switcherTab.current.classList.add(classes.shiftToNeutral);
      switcherTab.current.classList.remove(classes.shiftToRight);

      monthTab.current.classList.remove(classes.shiftToNeutralForm);
      todayTab.current.classList.remove(classes.shiftToLeft);
      setTodayTabActive(true);
      setMonthTabActive(false);
      console.log('todayClick');
      // date =today.getFullYear() + '-' + formatmonth(today) + '-' + today.getDate();
    }

    if (tab === 'month') {
      switcherTab.current.classList.add(classes.shiftToRight);
      switcherTab.current.classList.remove(classes.shiftToNeutral);

      monthTab.current.classList.add(classes.shiftToNeutralForm);
      todayTab.current.classList.add(classes.shiftToLeft);
      setTodayTabActive(false);
      setMonthTabActive(true);
      console.log('monthClick');
      // date = undefined;
    }
  };

  const newDate = new Date();
  const StartDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
  const lastDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);

  const year = getYear(StartDate);
  const month = formatmonth(StartDate);
  const firstDay = formatDay(StartDate);
  const lastDay = formatDay(lastDate);

  const fromDate = `${year}-${month}-${firstDay}`;
  const toDate = `${year}-${month}-${lastDay}`;

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

        <div className={classes.container}>
          <div className={classes.box}>
            <div>
              <div className={classes.toggle}>
                <p
                  onClick={(e) => switchTabs(e, 'today')}
                  className={classes.toggleTodo}
                >
                  Today
                </p>
                <p onClick={(e) => switchTabs(e, 'month')}>This Month</p>
              </div>
              <button ref={switcherTab}></button>
            </div>

            <div>
              <div className={classes.todayTab} ref={todayTab}>
                <UserData today={todayTab ? date : undefined} />
              </div>
              <div className={classes.monthTab} ref={monthTab}>
                <UserData
                  fromDate={monthTab ? fromDate : undefined}
                  toDate={monthTab ? toDate : undefined}
                />
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
