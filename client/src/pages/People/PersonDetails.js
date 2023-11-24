import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getPersonById } from '../../services/peopleService';
import { urls } from '../../utils/urls';

import Loader from '../../components/UI/Loader/Loader';
import BackToTop from '../../components/UI/BackToTop/BackToTop';

import classes from './PersonDetails.module.css';

const PersonDetailsPage = () => {
    const { personId } = useParams();
    const [person, setPerson] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getPerson = async () => {
            const person = await getPersonById(personId);
            setPerson(person);
        };

        setIsLoading(true);

        const timer = setTimeout(async () => {
            try {
                await getPerson();
            } catch (error) {
                navigate('/error');
            }

            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [personId, navigate]);

    const showPerson = <div className={classes.wrapper}>
        <h2>{person.name}</h2>
        <div className={classes['image-overview']}>
            <div className={classes['image-wrapper']}><img src={person.profile_path ? urls.images + person.profile_path : urls.defaultImage} alt={person.name} /></div>
            <div className={classes.overview}>{person.biography?.length > 700 ? person.biography.substring(0, 700) + '...' : person.biography}</div>
        </div>
        <div className={classes.details}>
            <div>Born: {person.birthday}, {person.place_of_birth}</div>
        </div>
        <a className={classes.source} href="https://www.themoviedb.org/" target='blank'>Data Source</a>
        <BackToTop />
    </div>;

    return (
        <>
            {isLoading ? <Loader /> : showPerson}
        </>
    );
};

export default PersonDetailsPage;