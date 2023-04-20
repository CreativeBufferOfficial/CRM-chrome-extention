import React, { useEffect, useRef, useState } from 'react';
import classes from './Homepage.module.css';
import logo from '../../assets/task_list/top_logo.png';
import UserData from './UserData';
import { logout, clearErrors } from '../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../../utlis/auth';
import { useNavigate } from 'react-router-dom';
import { removeAuth } from '../../utlis/auth';
import { apiUrls } from '../../utlis/ApiUrl';
import { defaultConfig } from '../../utlis/config';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import userIcon from '../../assets/task_list/user_icon.png';
import settingIcon from '../../assets/task_list/setting_icon.png';
import logoutIcon from '../../assets/task_list/logout_icon.png';

import {
  redirectProfile,
  redirectSetting,
  todayDate,
  toDateMonth,
  fromDateMonth,
} from '../../utlis/Helper';
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
    if (todayTabActive) {
    }

    // dispatch(loadUserTodo());
  }, [dispatch, error, navigate, isloggedIn, todayTabActive, monthTabActive]);

  console.log(`Home Page ${error} `);

  // console.log(` user tickets${JSON.stringify(ticket)}`);
  // console.log(` user tickets${toString(ticket)}`);

  const logoutHandler = (event) => {
    console.log(event);

    // const action = event.target.value;
    // console.log('htting logout handler');
    console.log(event);
    if (event === 'logout') {
      dispatch(logout());
      removeAuth();
    }
    if (event === 'profile') {
      redirectProfile(id);
    }
    if (event === 'setting') {
      redirectSetting();
    }
  };

  // const today = new Date();
  // let date =
  //   today.getFullYear() + '-' + formatmonth(today) + '-' + formatDay(today);
  // // console.log('@@@@@@@');

  // const newDate = new Date();
  // const StartDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
  // const lastDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);

  // const year = getYear(StartDate);
  // const month = formatmonth(StartDate);
  // const firstDay = formatDay(StartDate);
  // const lastDay = formatDay(lastDate);

  // const fromDate = `${year}-${month}-${firstDay}`;
  // const toDate = `${year}-${month}-${lastDay}`;
  let date;
  let fromDate;
  let toDate;
  if (todayTabActive) {
    date = todayDate();
  }
  if (monthTabActive) {
    fromDate = fromDateMonth();
    toDate = toDateMonth();
  }

  const switchTabs = (e, tab) => {
    if (tab === 'today') {
      switcherTab.current.classList.add(classes.shiftToNeutral);
      switcherTab.current.classList.remove(classes.shiftToRight);

      monthTab.current.classList.remove(classes.shiftToNeutralForm);
      todayTab.current.classList.remove(classes.shiftToLeft);
      setTodayTabActive(true);
      setMonthTabActive(false);
      console.log('todayClick');
      // date = todayDate();
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
            {/* <select className={classes.dropdown} onChange={logoutHandler}>
              <option value="username">&#xf2bd; UserName</option>
              <option value="profile">&#xf007; Profile</option>
              <option value="logout">&#xf14d; 👱‍♂️ Logout</option>
            </select> */}

            <DropdownButton
              onSelect={logoutHandler}
              id="dropdown-basic-button"
              title="Username"
              variant="default"
              className={classes.dropdown}
            >
              <Dropdown.Item eventKey="profile">
                <img
                  className={classes.dropdown_user}
                  src={userIcon}
                  alt="user_icon"
                />
                Profile
              </Dropdown.Item>
              <Dropdown.Item eventKey="setting">
                <img
                  className={classes.dropdown_img}
                  src={settingIcon}
                  alt="user_icon"
                />{' '}
                Change Password
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="logout">
                <img
                  className={classes.dropdown_img}
                  src={logoutIcon}
                  alt="user_icon"
                />{' '}
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.box}>
            <div>
              <div className={classes.toggle}>
                <p
                  onClick={(e) => switchTabs(e, 'today')}
                  className={
                    todayTabActive ? classes.toggleTrue : classes.toggleFalse
                  }
                >
                  Today
                </p>
                <p
                  onClick={(e) => switchTabs(e, 'month')}
                  className={
                    monthTabActive ? classes.toggleTrue : classes.toggleFalse
                  }
                >
                  This Month
                </p>
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
  );
};

export default Homepage;
