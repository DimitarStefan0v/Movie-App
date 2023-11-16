import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPersonById } from '../../services/peopleService';


const PersonDetailsPage = () => {
    const { personId } = useParams();
    const [person, setPerson] = useState();

    useEffect(() => {
        const getPerson = async () => {
            const person = await getPersonById(personId);
            setPerson(person);
        };

        getPerson();
    }, [personId])

    return (
        <div>Details Page: {personId} {console.log(person)}</div>
    );
};

export default PersonDetailsPage;