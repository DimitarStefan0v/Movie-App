import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieById } from '../../services/moviesService';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState();

    useEffect(() => {
        const getMovie = async () => {
            const movie = await getMovieById(movieId);
            setMovie(movie);
        };

        getMovie()
    }, [movieId]);

    return (
        <div>Details Page: {movieId} {console.log(movie)}</div>
    );
};

export default MovieDetailsPage;