import { useEffect, useState } from 'react';
import { getMoviesWithPages } from '../../services/getMovies';

const MoviesPage = () => {

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMoviesWithPages(1);
            console.log(movies);
        }

        fetchMovies();
    },
        []);

    return (
        <div>Movies Page</div>
    );
};

export default MoviesPage;