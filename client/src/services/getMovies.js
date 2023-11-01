import { requester } from './requester';
import { urls } from '../utils/urls';

export const getMoviesWithPages = (page = 1) => {
    const movies = requester(urls.movies + `&page=${page}&sort_by=primary_release_date.asc`);
    return movies;
};