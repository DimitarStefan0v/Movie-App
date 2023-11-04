import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPeopleWithPages } from '../../services/getPeople';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Pagination from '../../components/UI/Pagination/Pagination';

const PeoplePage = () => {
    const [peopleData, setPeopleData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPeople = async () => {
            const people = await getPeopleWithPages(currentPage);
            setPeopleData(people);
            window.scrollTo(0, 0);
        }

        fetchPeople().catch(err => navigate('/error'));
    },
        [currentPage, navigate]);

    const changePageHandler = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    return (
        <>
            <CardList>{peopleData.results?.map(person => <Card key={person.id} poster={person.profile_path} title={person.name} />)}</CardList>
            <Pagination changePageHandler={changePageHandler} currentPage={currentPage} lastPage={500} />
        </>
    );
};

export default PeoplePage;