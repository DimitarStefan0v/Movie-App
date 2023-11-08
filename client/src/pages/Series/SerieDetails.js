import { useParams } from 'react-router-dom';

const SerieDetailsPage = () => {
    const { serieId } = useParams();

    return (
        <div>Details Page: {serieId}</div>
    );
};

export default SerieDetailsPage;