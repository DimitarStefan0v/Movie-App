import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getSerieById } from '../../services/seriesService';
import { urls } from '../../utils/urls';

import Loader from '../../components/UI/Loader/Loader';
import BackToTop from '../../components/UI/BackToTop/BackToTop';

import classes from './SerieDetails.module.css';

const SerieDetailsPage = () => {
	const { serieId } = useParams();
	const [serie, setSerie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		getSerieById(serieId)
			.then((serie) => {
                setSerie(serie);
                setIsLoading(false);
            })
			.catch((err) => navigate('/error'));

	}, [serieId, navigate]);

	const showSerie = (
		<div className={classes.wrapper}>
			<h2>{serie.name}</h2>
			<div className={classes['image-overview']}>
				<div className={classes['image-wrapper']}>
					<img
						src={
							serie.poster_path
								? urls.images + serie.poster_path
								: urls.defaultImage
						}
						alt={serie.name}
					/>
				</div>
				<div className={classes.overview}>
					{serie.overview?.length > 700
						? serie.overview.substring(0, 700) + '...'
						: serie.overview}
				</div>
			</div>
			<div className={classes.details}>
				<div>First Air Date: {serie.first_air_date}</div>
				<div>
					Vote:{' '}
					{serie.vote_average
						? serie.vote_average.toFixed(1)
						: serie.vote_average}{' '}
					/ 10 ({serie.vote_count})
				</div>
				<div className={classes.genres}>
					{serie.genres?.map((x) => (
						<span key={x.id}>{x.name}</span>
					))}
				</div>
				<div>Seasons: {serie.number_of_seasons}</div>
				<div>Episodes: {serie.number_of_episodes}</div>
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

	return <>{isLoading ? <Loader /> : showSerie}</>;
};

export default SerieDetailsPage;
