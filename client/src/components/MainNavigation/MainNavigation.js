import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav className={classes.nav}>
                <input type="checkbox" />
                <div className={classes.hamburger}>
                    <div className={classes['hamburger-top']}></div>
                    <div className={classes['hamburger-middle']}></div>
                    <div className={classes['hamburger-bottom']}></div>
                </div>
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
    );
};

export default MainNavigation;