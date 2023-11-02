import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSeriesWithPages } from '../../services/getSeries';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Pagination from '../../components/UI/Pagination/Pagination';

const SeriesPage = () => {
    const [seriesData, setSeriesData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeries = async () => {
            const series = await getSeriesWithPages(currentPage);
            setSeriesData(series);
            window.scrollTo(0, 0);
        };

        fetchSeries().catch(err => navigate('/error'));
    },
        [currentPage, navigate]);

    const changePageHandler = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    return (
        <>
            <CardList>{seriesData.results?.map(serie => <Card key={serie.id} poster={serie.poster_path} title={serie.name} />)}</CardList>
            <Pagination changePageHandler={changePageHandler} currentPage={currentPage} lastPage={500} />
        </>
    );
};

export default SeriesPage;