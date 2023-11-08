import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movieId } = useParams();

    return (
        <div>Details Page: {movieId}</div>
    );
};

export default MovieDetailsPage;