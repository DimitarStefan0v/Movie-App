import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getMoviesWithPages } from '../../services/moviesService';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Sorter from '../../components/UI/Sorter/Sorter';
import Pagination from '../../components/UI/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';
import BackToTop from '../../components/UI/BackToTop/BackToTop';

const MoviesPage = () => {
	const [moviesData, setMoviesData] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [currentFilter, setCurrentFilter] = useState('popularity.desc');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		getMoviesWithPages(currentPage, currentFilter)
			.then((movies) => {
				setMoviesData(movies);
				window.scrollTo(0, 0);
				setIsLoading(false);
			})
			.catch((err) => navigate('/error'));
            
	}, [currentPage, currentFilter, navigate]);

	const changePageHandler = (selectedPage) => {
		setCurrentPage(selectedPage);
	};

	const changeSortQueryHandler = (selectedQuery) => {
		setCurrentFilter(selectedQuery);
	};

	const showMovies = (
		<>
			<Sorter
				currentFilter={currentFilter}
				changeSortQueryHandler={changeSortQueryHandler}
			/>
			<CardList>
				{moviesData.results?.map((movie) => (
					<Link key={movie.id} to={`/movie/${movie.id}/details`}>
						<Card poster={movie.poster_path} title={movie.title} />
					</Link>
				))}
			</CardList>
			<Pagination
				changePageHandler={changePageHandler}
				currentPage={currentPage}
				lastPage={moviesData.total_pages > 500 ? 500 : moviesData.total_pages}
			/>
			<BackToTop />
		</>
	);

	return <>{isLoading ? <Loader /> : showMovies}</>;
};

export default MoviesPage;
