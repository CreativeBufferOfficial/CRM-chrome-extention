import React, { useEffect, useRef, useState } from 'react';
import classes from './Homepage.module.css';
import logo from '../../assets/task_list/top_logo.png';
import UserData from './UserData';
import { logout } from '../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../../utlis/auth';
import { useNavigate } from 'react-router-dom';
import { removeAuth } from '../../utlis/auth';
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

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const todayTab = useRef(null);
  const monthTab = useRef(null);
  const switcherTab = useRef(null);
  const [todayTabActive, setTodayTabActive] = useState(true);
  const [monthTabActive, setMonthTabActive] = useState(false);

  //TODO: FIXME:
  const id = user?.id;
  const name = user?.name;
  const token = user?.access_token;
  setSession(token, id, name);
  const isloggedIn = localStorage.getItem('isAuthenticated');
  const userName = localStorage.getItem('name');
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (isloggedIn === null) {
      navigate('/');
    }
    if (todayTabActive) {
    }
  }, [dispatch, navigate, isloggedIn, todayTabActive, monthTabActive]);

  const logoutHandler = (event) => {
    if (event === 'logout') {
      dispatch(logout());
      removeAuth();
    }
    if (event === 'profile') {
      redirectProfile(userId);
    }
    if (event === 'setting') {
      redirectSetting();
    }
  };

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
    }

    if (tab === 'month') {
      switcherTab.current.classList.add(classes.shiftToRight);
      switcherTab.current.classList.remove(classes.shiftToNeutral);

      monthTab.current.classList.add(classes.shiftToNeutralForm);
      todayTab.current.classList.add(classes.shiftToLeft);
      setTodayTabActive(false);
      setMonthTabActive(true);
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
            <DropdownButton
              onSelect={logoutHandler}
              id="dropdown-basic-button"
              title={userName?.split(' ')[0].slice(0, 10).toString()}
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
                />
                Change Password
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="logout">
                <img
                  className={classes.dropdown_img}
                  src={logoutIcon}
                  alt="user_icon"
                />
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
    </>
  );
};

export default Homepage;
