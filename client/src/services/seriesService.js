import { requester } from './requester';
import { urls } from '../utils/urls';

export const getSeriesWithPages = (page = 1, sort = 'popularity.desc') => {
    const series = requester(urls.series + `&page=${page}&sort_by=${sort}`);
    return series;
};

export const getSerieById = (serieId) => {
    const serie = requester(urls.details + `/tv/${serieId}?language=en-US`);
    return serie;
};