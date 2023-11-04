import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSeriesWithPages } from '../../services/getSeries';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Sorter from '../../components/UI/Sorter/Sorter';
import Pagination from '../../components/UI/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';

const SeriesPage = () => {
    const [seriesData, setSeriesData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState('popularity.desc');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeries = async () => {
            const series = await getSeriesWithPages(currentPage, currentFilter);
            setSeriesData(series);
            window.scrollTo(0, 0);
        };

        setIsLoading(true);

        const timer = setTimeout(async () => {
            try {
                await fetchSeries();
            } catch (error) {
                navigate('/error')
            }

            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    },
        [currentPage, currentFilter, navigate]);

    const changePageHandler = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const changeSortQueryHandler = (selectedQuery) => {
        setCurrentFilter(selectedQuery);
    };

    const showSeries = <>
        <Sorter currentFilter={currentFilter} changeSortQueryHandler={changeSortQueryHandler} />
        <CardList>{seriesData.results?.map(serie => <Card key={serie.id} poster={serie.poster_path} title={serie.name} />)}</CardList>
        <Pagination changePageHandler={changePageHandler} currentPage={currentPage} lastPage={500} />
    </>;

    return (
        <>
            {isLoading ? <Loader /> : showSeries}
        </>
    );
};

export default SeriesPage;