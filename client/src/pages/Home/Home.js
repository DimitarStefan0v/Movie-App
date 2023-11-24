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


    return (
    );
};

export default HomePage;