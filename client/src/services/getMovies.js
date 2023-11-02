import { requester } from './requester';
import { urls } from '../utils/urls';

export const getMoviesWithPages = (page = 1, sort = 'popularity.desc') => {
    const movies = requester(urls.movies + `&page=${page}&sort_by=${sort}`);
    return movies;
};