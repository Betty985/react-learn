import React, { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { loggedOutArr } from "./route";

interface LoggedProps {
  currentUser: any;
}

const LoggedOutView: FC<LoggedProps> = (props) => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        {loggedOutArr.map((item) => {
          const { path, title } = item;
          return (
            <li key={title} className="nav-item">
              <Link to={path} className="nav-link">
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
  return null;
};

const LoggedInView: FC<LoggedProps> = (props) => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          主页
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/editor" className="nav-link">
          <i className="ion-compose" />
          &nbsp;发帖
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/settings" className="nav-link">
          <i className="ion-gear-a" />
          &nbsp;设置
        </Link>
      </li>

      <li className="nav-item">
        <Link to={`/@${props.currentUser}`} className="nav-link">
          <img src={props.currentUser} className="user-pic" alt="" />
          {props.currentUser}
        </Link>
      </li>
    </ul>
  );
};

const Header: FC = () => (
  <nav className="navbar navbar-light">
    <div className="container">
      <Link to="/" className="navbar-brand">
        {"Conduit".toLowerCase()}
      </Link>
      <LoggedOutView currentUser={""} />
      <LoggedInView currentUser={""} />
    </div>
  </nav>
);
inject("userStore")(observer(Header));
export default Header;
