import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMoviesWithPages } from '../../services/getMovies';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Pagination from '../../components/UI/Pagination/Pagination';


const MoviesPage = () => {
    const [moviesData, setMoviesData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMoviesWithPages(currentPage);
            setMoviesData(movies);
            window.scrollTo(0, 0);
        }

        fetchMovies().catch(err => navigate('/error'));
    },
        [currentPage, navigate]);

    const changePageHandler = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    return (
        <>
            <CardList>{moviesData.results?.map(movie => <Card key={movie.id} poster={movie.poster_path} title={movie.title} />)}
            </CardList>
            <Pagination changePageHandler={changePageHandler} currentPage={currentPage} lastPage={500} />
        </>
    );
};

export default MoviesPage;