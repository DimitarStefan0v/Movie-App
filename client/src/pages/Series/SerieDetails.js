import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSerieById } from '../../services/seriesService';

const SerieDetailsPage = () => {
    const { serieId } = useParams();
    const [serie, setSerie] = useState();

    useEffect(() => {
        const getSerie = async () => {
            const serie = await getSerieById(serieId);
            setSerie(serie);
        };

        getSerie();
    }, [serieId]);

    return (
        <div>Details Page: {serieId} {console.log(serie)}</div>
    );
};

export default SerieDetailsPage;