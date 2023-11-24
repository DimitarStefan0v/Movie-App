import { useState, useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { getMoviesWithPages } from '../../services/moviesService';
import { getSeriesWithPages } from '../../services/seriesService';
import { getPeopleWithPages } from '../../services/peopleService';

import Loader from '../../components/UI/Loader/Loader';
import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import BackToTop from '../../components/UI/BackToTop/BackToTop';

import classes from './Home.module.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [celebs, setCelebs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getMovies = async () => {
            const movies = await getMoviesWithPages();
            setMovies(movies.results.slice(0, 4));
        };

        const getSeries = async () => {
            const series = await getSeriesWithPages();
            setSeries(series.results.slice(0, 4));
        };

        const getCelebs = async () => {
            const celebs = await getPeopleWithPages();
            setCelebs(celebs.results.slice(0, 4));
        };

        setIsLoading(true);

        const timer = setTimeout(async () => {
            try {
                Promise.all([getMovies(), getSeries(), getCelebs()]);
            } catch (error) {
                navigate('/error');
            }

            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const showResults = <>
        <h2 className={classes.heading}>Top movies by popularity</h2>
        <CardList>
            {movies.map(movie => <Link key={movie.id} to={`/movie/${movie.id}/details`}><Card poster={movie.poster_path} title={movie.title} /></Link>)}
        </CardList>
        <h2 className={classes.heading}>Top series by popularity</h2>
        <CardList>
            {series.map(serie => <Link key={serie.id} to={`/tv/${serie.id}/details`}><Card poster={serie.poster_path} title={serie.name} /></Link>)}
        </CardList>
        <h2 className={classes.heading}>Top celebs by popularity</h2>
        <CardList>
            {celebs.map(celeb => <Link key={celeb.id} to={`/person/${celeb.id}/details`}><Card poster={celeb.profile_path} title={celeb.name} /></Link>)}
        </CardList>
        <BackToTop />
    </>;

    return (
        <>
            {isLoading ? <Loader /> : showResults}
        </>
    );
};

export default HomePage;