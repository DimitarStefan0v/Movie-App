import { requester } from './requester';
import { urls } from '../utils/urls';

export const getSeriesWithPages = (page = 1, sort = 'popularity.desc') => {
    const series = requester(urls.series + `&page=${page}&sort_by=${sort}`);
    return series;
};