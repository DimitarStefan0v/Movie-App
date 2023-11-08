import { useParams } from 'react-router-dom';

const PersonDetailsPage = () => {
    const { personId } = useParams();

    return (
        <div>Details Page: {personId}</div>
    );
};

export default PersonDetailsPage;