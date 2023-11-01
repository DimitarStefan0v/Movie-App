import { useEffect, useState } from 'react';
import { getMoviesWithPages } from '../../services/getMovies';

import Card from '../../components/UI/Card/Card';

const MoviesPage = () => {
    const [moviesData, setMoviesData] = useState({});

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMoviesWithPages(1);
            setMoviesData(movies);
        }

        fetchMovies();
    },
        []);

    return (
        <div>{moviesData.results?.map(movie => <Card key={movie.id} movie={movie} />)}</div>
    );
};

export default MoviesPage;