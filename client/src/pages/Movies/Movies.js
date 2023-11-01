import { useEffect, useState } from 'react';
import { getMoviesWithPages } from '../../services/getMovies';

import CardList from '../../components/UI/CardList/CardList';
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
        <CardList>{moviesData.results?.map(movie => <Card key={movie.id} movie={movie} />)}</CardList>
        );
};

export default MoviesPage;