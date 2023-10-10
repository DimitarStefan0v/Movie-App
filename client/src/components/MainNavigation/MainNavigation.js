import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
    return (
        <header>
            <div className="hamburger-menu">
                <input type="checkbox" />
            </div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/movies">Movies</NavLink></li>
                <li><NavLink to="/series">TV Shows</NavLink></li>
            </ul>
        </header>
    );
};

export default MainNavigation;