import React from 'react';
import {
    ALL_EVENTS_ROUTE, EVENT_EDITOR_ROUTE,
    INDEX_ROUTE,
    MY_EVENTS_ROUTE,
    PROFILE_ROUTE,
    USER_REGISTERED_EVENTS_ROUTE
} from "../utils/consts";
import {Link} from "react-router-dom";
import '../css/header.css'


const Header = () => {
    return localStorage.getItem('status') === 'student' ?
        (
          <header className="header">
              <div className="options">
                  <span className="icon-options"></span>
                  <div className="options-links">
                      <Link className="options-link" data-is-active={(document.location.pathname === INDEX_ROUTE).toString()} to={INDEX_ROUTE}>Главная</Link>
                      <Link className="options-link" data-is-active={(document.location.pathname === ALL_EVENTS_ROUTE).toString()} to={ALL_EVENTS_ROUTE}>Поиск событий</Link>
                      <Link className="options-link" data-is-active={(document.location.pathname === USER_REGISTERED_EVENTS_ROUTE).toString()} to={USER_REGISTERED_EVENTS_ROUTE}>Я участвую</Link>
                  </div>
              </div>
              <div className="options"><span className="icon-options"></span></div>
              <Link className="header-link" data-is-active={(document.location.pathname === INDEX_ROUTE).toString()} to={INDEX_ROUTE}>Главная</Link>
              <Link className="header-link" data-is-active={(document.location.pathname === ALL_EVENTS_ROUTE).toString()} to={ALL_EVENTS_ROUTE}>Поиск событий</Link>
              <Link className="header-link" data-is-active={(document.location.pathname === USER_REGISTERED_EVENTS_ROUTE).toString()} to={USER_REGISTERED_EVENTS_ROUTE}>Я участвую</Link>
              <Link className="header-link" data-is-active={(document.location.pathname === PROFILE_ROUTE).toString()} to={PROFILE_ROUTE}>{localStorage.getItem('username')}</Link>

          </header>
        )
        :
        (
          <header className="header">
              <div className="options">
                  <span className="icon-options"></span>
                  <div className="options-links">
                      <Link className="options-link" data-is-active={(document.location.pathname === INDEX_ROUTE).toString()} to={INDEX_ROUTE}>Главная</Link>
                      <Link className="options-link" data-is-active={(document.location.pathname === ALL_EVENTS_ROUTE).toString()} to={ALL_EVENTS_ROUTE}>Поиск событий</Link>
                      <Link className="options-link" data-is-active={(document.location.pathname === MY_EVENTS_ROUTE).toString()} to={MY_EVENTS_ROUTE}>Мои события</Link>
                      <Link className="options-link" data-is-active={(document.location.pathname === EVENT_EDITOR_ROUTE).toString()} to={EVENT_EDITOR_ROUTE}>Создать событие</Link>
                  </div>
              </div>
              <Link className="header-link" data-is-active={(document.location.pathname === INDEX_ROUTE).toString()} to={INDEX_ROUTE}>Главная</Link>
              <Link className="header-link" data-is-active={(document.location.pathname === ALL_EVENTS_ROUTE).toString()} to={ALL_EVENTS_ROUTE}>Поиск событий</Link>
              <Link className="header-link" data-is-active={(document.location.pathname === MY_EVENTS_ROUTE).toString()} to={MY_EVENTS_ROUTE}>Мои события</Link>
              <Link className="header-link" data-is-active={(document.location.pathname === EVENT_EDITOR_ROUTE).toString()} to={EVENT_EDITOR_ROUTE}>Создать событие</Link>
              <Link className="header-link profile-link" data-is-active={(document.location.pathname === PROFILE_ROUTE).toString()} to={PROFILE_ROUTE}>{localStorage.getItem('username')}</Link>
          </header>
        );

};

export default React.memo(Header);