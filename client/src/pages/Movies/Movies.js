import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMoviesWithPages } from '../../services/getMovies';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Sorter from '../../components/UI/Sorter/Sorter';
import Pagination from '../../components/UI/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';


const MoviesPage = () => {
    const [moviesData, setMoviesData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState('popularity.desc');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMoviesWithPages(currentPage, currentFilter);
            setMoviesData(movies);
            window.scrollTo(0, 0);
        }

        setIsLoading(true);

        const timer = setTimeout(async () => {
            try {
                await fetchMovies();
            } catch (error) {
                navigate('/error');
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

    const showMovies = <>
        <Sorter currentFilter={currentFilter} changeSortQueryHandler={changeSortQueryHandler} />
        <CardList>{moviesData.results?.map(movie => <Card key={movie.id} poster={movie.poster_path} title={movie.title} />)}</CardList>
        <Pagination changePageHandler={changePageHandler} currentPage={currentPage} lastPage={500} />
    </>;

    return (
        <>
            {isLoading ? <Loader /> : showMovies}
        </>
    );
};

export default MoviesPage;