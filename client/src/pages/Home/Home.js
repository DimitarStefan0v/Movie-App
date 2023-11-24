import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getMoviesWithPages } from '../../services/moviesService';
import { getSeriesWithPages } from '../../services/seriesService';
import { getPeopleWithPages } from '../../services/peopleService';

import Loader from '../../components/UI/Loader/Loader';

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

    return (
        <>
            {isLoading ? <Loader /> : console.log(celebs)}
        </>
    );
};

export default HomePage;