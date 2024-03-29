import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getSeriesWithPages } from '../../services/seriesService';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Sorter from '../../components/UI/Sorter/Sorter';
import Pagination from '../../components/UI/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';
import BackToTop from '../../components/UI/BackToTop/BackToTop';

const SeriesPage = () => {
	const [seriesData, setSeriesData] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [currentFilter, setCurrentFilter] = useState('popularity.desc');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		getSeriesWithPages(currentPage, currentFilter)
			.then((series) => {
                setSeriesData(series);
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

	const showSeries = (
		<>
			<Sorter
				currentFilter={currentFilter}
				changeSortQueryHandler={changeSortQueryHandler}
			/>
			<CardList>
				{seriesData.results?.map((serie) => (
					<Link key={serie.id} to={`/tv/${serie.id}/details`}>
						<Card poster={serie.poster_path} title={serie.name} />
					</Link>
				))}
			</CardList>
			<Pagination
				changePageHandler={changePageHandler}
				currentPage={currentPage}
				lastPage={seriesData.total_pages > 500 ? 500 : seriesData.total_pages}
			/>
			<BackToTop />
		</>
	);

	return <>{isLoading ? <Loader /> : showSeries}</>;
};

export default SeriesPage;
