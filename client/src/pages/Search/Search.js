import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSearchDataWithPages } from '../../services/getData';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Pagination from '../../components/UI/Pagination/Pagination';

import classes from './Search.module.css';

const options = [
    { value: 'movie', text: 'Movie' },
    { value: 'tv', text: 'TV Show' },
    { value: 'person', text: 'Celeb' },
];

const SearchPage = () => {
    const [results, setResults] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData, setSearchData] = useState('');
    const [selected, setSelected] = useState(options[0].value);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSearchDataWithPages(selected, searchData, currentPage);
            setResults(data);
            window.scrollTo(0, 0);
        }

        fetchData().catch(err => navigate('/error'));
      
    }, [selected, searchData, currentPage, navigate])

    const inputHandler = (ev) => {
        setSearchData(ev.target.value);
    };

    const selectHandler = (ev) => {
        setSelected(ev.target.value);
        setCurrentPage(1);
    };

    const changePageHandler = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const showResults = () => {
        if (searchData.length === 0) {
            return undefined;
        } else if (results.results?.length === 0) {
            return (<>
                <div>Results for "{searchData}"</div>
                <div>Nothing Found Sorry</div>
            </>);
        } else {
            return (<>
                <div className={classes.searchHeading}>Results for "{searchData}"</div>
                <CardList>{results.results?.map(item => <Card key={item.id} poster={selected === 'person' ? item.profile_path : item.poster_path} title={selected === 'movie' ? item.title : item.name} />)}</CardList>
                <Pagination changePageHandler={changePageHandler} currentPage={currentPage} lastPage={results.total_pages > 500 ? 500 : results.total_pages} />
            </>);
        }
    }

    return (
        <div><h1 className={classes.heading}>Search by typing a word or phrase in the search box at the top of this page.</h1>
            <form className={classes.form}>
                <input id="search" type="text" value={searchData} onChange={inputHandler} />
                <select id="type" value={selected} onChange={selectHandler}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                </select>
                <button type='button'>Search</button>
            </form>

            {showResults()}
        </div>
    );
};

export default SearchPage;