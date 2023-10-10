import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <nav className={classes.nav}>
                <div className={classes.toggle}>
                    <div className={classes.hamburger}>
                        <input type="checkbox" />
                        <div className={classes['hamburger-top']}></div>
                        <div className={classes['hamburger-middle']}></div>
                        <div className={classes['hamburger-bottom']}></div>
                    </div>
                </div>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/movies">Movies</NavLink></li>
                    <li><NavLink to="/series">TV Shows</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;