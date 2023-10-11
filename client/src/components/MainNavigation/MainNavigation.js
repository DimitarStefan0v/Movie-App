import { useState } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

import Backdrop from '../UI/Backdrop/Backdrop';

import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    const [showNavigation, setShowNavigation] = useState(false);

    const toggleNavigation = () => {
        setShowNavigation(state => !state);
    };

    return (
        <>
            <header className={classes.header}>
                <nav className={classes['nav-mobile']}>
                    <div className={showNavigation ? `${classes.hamburger} ${classes.open}` : `${classes.hamburger}`} onClick={toggleNavigation}>
                        <div className={classes['hamburger-top']}></div>
                        <div className={classes['hamburger-middle']}></div>
                        <div className={classes['hamburger-bottom']}></div>
                    </div>
                    <ul className={showNavigation ? `${classes.links}` : `${classes.links} ${classes.collapse}`}>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : `${classes.link}`}
                                to="/"
                                onClick={toggleNavigation}
                            >Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : `${classes.link}`}
                                to="/movies"
                                onClick={toggleNavigation}
                            >Movies
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : `${classes.link}`}
                                to="/series"
                                onClick={toggleNavigation}
                            >TV Shows
                            </NavLink>
                        </li>
                    </ul>
                    {ReactDOM.createPortal(
                        <Backdrop className={showNavigation ? '' : 'collapse'} onClick={toggleNavigation} />,
                        document.getElementById('backdrop-root')
                    )}
                </nav>

                <nav className={classes['nav-desktop']}>
                    <ul className={classes.links}>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : `${classes.link}`}
                                to="/"
                            >Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : `${classes.link}`}
                                to="/movies"
                            >Movies
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : `${classes.link}`}
                                to="/series"
                            >TV Shows
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default MainNavigation;