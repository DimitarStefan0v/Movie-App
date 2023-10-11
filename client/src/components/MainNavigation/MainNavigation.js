import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    const [showNavigation, setShowNavigation] = useState(false);

    const toggleNavigation = () => {
        setShowNavigation(state => !state);
    };

    return (
        <header className={classes.header}>
            <nav className={classes.nav}>
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
            </nav>
        </header>
    );
};

export default MainNavigation;