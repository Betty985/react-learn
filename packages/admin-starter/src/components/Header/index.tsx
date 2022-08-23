import React, { FC } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";
interface LoggedProps {
  currentUser: any;
}

const LoggedOutView: FC<LoggedProps> = (props) => {
  const { currentUser } = props
  if (!currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    );
  }
  return <></>;
};

const LoggedInView: FC<LoggedProps> = (props) => {
  const { currentUser } = props
  if (currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose" />
            &nbsp;New Article
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a" />
            &nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link to={`/@${currentUser}`} className="nav-link">
            <img src={currentUser} className="user-pic" alt="user-pic" />
            {currentUser}
          </Link>
        </li>
      </ul>
    );
  }
  return <></>;
};

const Header: FC = () => {
  const { userStore, commonStore } = useStores();
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {commonStore.appName.toLowerCase()}
        </Link>
        <LoggedOutView currentUser={userStore.currentUser} />
        <LoggedInView currentUser={userStore.currentUser} />
      </div>
    </nav>
  );
};
observer(Header);
export default Header;
