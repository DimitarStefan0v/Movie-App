import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPeopleWithPages } from '../../services/getPeople';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Pagination from '../../components/UI/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';

const PeoplePage = () => {
    const [peopleData, setPeopleData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPeople = async () => {
            const people = await getPeopleWithPages(currentPage);
            setPeopleData(people);
            window.scrollTo(0, 0);
        }

        setIsLoading(true);

        const timer = setTimeout(async () => {
            try {
                await fetchPeople();
            } catch (error) {
                navigate('/error')
            }

            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    },
        [currentPage, navigate]);

    const changePageHandler = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const showPeople = <>
        <CardList>{peopleData.results?.map(person => <Card key={person.id} poster={person.profile_path} title={person.name} />)}</CardList>
        <Pagination changePageHandler={changePageHandler} currentPage={currentPage} lastPage={500} />
    </>;

    return (
        <>  
            {isLoading ? <Loader /> : showPeople}
        </>
    );
};

export default PeoplePage;