import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getPeopleWithPages } from '../../services/peopleService';

import CardList from '../../components/UI/CardList/CardList';
import Card from '../../components/UI/Card/Card';
import Pagination from '../../components/UI/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';
import BackToTop from '../../components/UI/BackToTop/BackToTop';

const PeoplePage = () => {
	const [peopleData, setPeopleData] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		getPeopleWithPages(currentPage)
			.then((people) => {
                setPeopleData(people);
                window.scrollTo(0, 0);
                setIsLoading(false);
            })
			.catch((err) => navigate('/error'));

	}, [currentPage, navigate]);

	const changePageHandler = (selectedPage) => {
		setCurrentPage(selectedPage);
	};

	const showPeople = (
		<>
			<CardList>
				{peopleData.results?.map((person) => (
					<Link key={person.id} to={`/person/${person.id}/details`}>
						<Card poster={person.profile_path} title={person.name} />
					</Link>
				))}
			</CardList>
			<Pagination
				changePageHandler={changePageHandler}
				currentPage={currentPage}
				lastPage={peopleData.total_pages > 500 ? 500 : peopleData.total_pages}
			/>
			<BackToTop />
		</>
	);

	return <>{isLoading ? <Loader /> : showPeople}</>;
};

export default PeoplePage;
