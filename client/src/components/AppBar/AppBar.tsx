/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {isAuthenticated} from '../../store/auth';
import actions from '../../store/actions';
import {Role} from '../../core/profile';
import {AppBarElement} from './AppBarElement';

// import AppSearch from "./AppSearch"

type AuthMenuOptions = Record<Role, React.ReactElement>;

export const AppBar = () => {
  const isSignIn = useSelector((state: RootState) => isAuthenticated(state));

  const dispatch = useDispatch();

  const role = useSelector((state: RootState) => state.auth.access?.role);
  const onLogout = () => dispatch(actions.auth.logout());

  const authetictedMenu: AuthMenuOptions = {
    ISSUER: (
      <>
        <AppBarElement title="Payments" to="/payments" key="payments" />
        <AppBarElement title="Bonds" to="/bonds" key="bonds" />
        <AppBarElement title="Companies" to="/companies" key="companies" />
      </>
    ),

    SUPPLIER: (
      <>
        <AppBarElement title="Incoming payments" to="/payments" />
        <AppBarElement title="Operations" to="/operations" />
        <AppBarElement title="Suppliers" to="/suppliers" />
        <AppBarElement title="Retailers" to="/retailers" />
      </>
    ),

    INVESTOR: (
      <>
        <AppBarElement title="Bonds offers" to="/offers" />
        <AppBarElement title="Waller" to="/wallet" />
        <AppBarElement title="Retailers" to="/retailers" />
      </>
    ),
  };

  const authetictedProfileMenu = (
    <div className="navbar-right">
      <NavDropdown title="Account" id="basic-nav-dropdown" alignRight>
        <NavDropdown.Item href="#action/3.1">
          <i data-feather="life-buoy" key={'11'} />
          Action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2" key={12}>
          Another action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3" key={13}>
          Something
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogout}>
          <i data-feather="log-out" />
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );

  const nonAutheticatedMenu = (
    <div className="navbar-right">
      <Navbar id="basic-navbar-nav" className={'nav-link'}>
        {/*<Nav className="mr-auto"></Nav>*/}
        <Nav variant={'pills'}>
          <Nav key={3.1}>
            <Link to={'/login'}>SIGN IN </Link>
          </Nav>
          <Nav key={3.2}>
            <Link to={'/signup'}>SIGN UP </Link>
          </Nav>
        </Nav>
      </Navbar>
    </div>
  );

  const authMenu = role
    ? authetictedMenu['ISSUER'] || nonAutheticatedMenu
    : nonAutheticatedMenu;

  return (
    <Navbar className="navbar-header navbar-header-fixed">
      <a href="#" id="mainMenuOpen" className="burger-menu">
        <i data-feather="menu" />
      </a>
      <Navbar.Brand>
        <Link to="/" className="df-logo">
          Lean<span>tool</span>
        </Link>
      </Navbar.Brand>
      <div id="navbarMenu" className="navbar-menu-wrapper">
        <div className="navbar-menu-header">
          <Link to="/" className="df-logo">
            dash<span>forge</span>
          </Link>
          <a id="mainMenuClose" href="#">
            <i data-feather="x" />
          </a>
        </div>
        <Nav className="navbar-menu">
          {/*<NavDropdown title="Account" id="basic-nav-dropdown">*/}
          {/*  <NavDropdown.Item href="#action/3.1" className={'nav-sub-item'}>*/}
          {/*    Action*/}
          {/*  </NavDropdown.Item>*/}
          {/*  <NavDropdown.Item href="#action/3.2">*/}
          {/*    Another action*/}
          {/*  </NavDropdown.Item>*/}
          {/*  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
          {/*  <NavDropdown.Divider />*/}
          {/*  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>*/}
          {/*</NavDropdown>*/}

          {/*<li className="nav-item">*/}
          {/*  <Link to="/hypotheses/" className="nav-link">*/}
          {/*    <i data-feather="box" /> Components*/}
          {/*  </Link>*/}
          {/*</li>*/}
          {/*<li className="nav-item">*/}
          {/*  <Link to="/hypotheses/" className="nav-link">*/}
          {/*    <i data-feather="archive" /> Collections*/}
          {/*  </Link>*/}
          {/*</li>*/}
          {isSignIn ? [authMenu, authetictedProfileMenu] : nonAutheticatedMenu}
        </Nav>
      </div>
    </Navbar>
  );
};

export default AppBar;
