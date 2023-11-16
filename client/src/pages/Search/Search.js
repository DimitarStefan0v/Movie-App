import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getSearchDataWithPages } from '../../services/searchService';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Pagination from '../../components/UI/Pagination/Pagination';
import BackToTop from '../../components/UI/BackToTop/BackToTop';

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
                <div className={classes.searchHeading}>Results for "{searchData}"</div>
                <div className={classes.searchHeading}>Nothing Found Sorry</div>
            </>);
        } else {
            return (<>
                <div className={classes.searchHeading}>Results for "{searchData}"</div>
                <CardList>{results.results?.map(item => <Link key={item.id} to={`/${selected}/${item.id}/details`}><Card poster={selected === 'person' ? item.profile_path : item.poster_path} title={selected === 'movie' ? item.title : item.name} /></Link>)}</CardList>
                <Pagination changePageHandler={changePageHandler} currentPage={currentPage} lastPage={results.total_pages > 500 ? 500 : results.total_pages} />
                <BackToTop />
            </>);
        }
    }

    return (
        <div><h1 className={classes.heading}>Search by typing a word or phrase in the search box at the top of this page.</h1>
            <form className={classes.form}>
                <input className={classes.input} type="text" value={searchData} onChange={inputHandler} placeholder='Start typing here...' />
                <select className={classes.select} value={selected} onChange={selectHandler}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                </select>
                {/* <button type="button" className={classes.button}>Search</button> */}
            </form>

            {showResults()}
        </div>
    );
};

export default SearchPage;