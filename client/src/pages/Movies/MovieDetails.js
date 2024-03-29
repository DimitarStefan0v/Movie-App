import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getMovieById } from '../../services/moviesService';
import { urls } from '../../utils/urls';

import Loader from '../../components/UI/Loader/Loader';
import BackToTop from '../../components/UI/BackToTop/BackToTop';

import classes from './MovieDetails.module.css';

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		getMovieById(movieId)
			.then((movie) => {
				setMovie(movie);
				setIsLoading(false);
			})
			.catch((err) => navigate('/error'));
		
	}, [movieId, navigate]);

	const showMovie = (
		<div className={classes.wrapper}>
			<h2>{movie.title}</h2>
			<div className={classes['image-overview']}>
				<div className={classes['image-wrapper']}>
					<img
						src={
							movie.poster_path
								? urls.images + movie.poster_path
								: urls.defaultImage
						}
						alt={movie.title}
					/>
				</div>
				<div className={classes.overview}>
					{movie.overview?.length > 700
						? movie.overview.substring(0, 700) + '...'
						: movie.overview}
				</div>
			</div>
			<div className={classes.details}>
				<div>Release Date: {movie.release_date}</div>
				<div>
					Vote:{' '}
					{movie.vote_average
						? movie.vote_average.toFixed(1)
						: movie.vote_average}{' '}
					/ 10 ({movie.vote_count})
				</div>
				<div className={classes.genres}>
					{movie.genres?.map((x) => (
						<span key={x.id}>{x.name}</span>
					))}
				</div>
			</div>
			<a
				className={classes.source}
				href='https://www.themoviedb.org/'
				target='blank'
			>
				Data Source
			</a>
			<BackToTop />
		</div>
	);

	return <>{isLoading ? <Loader /> : showMovie}</>;
};

export default MovieDetailsPage;
