import { requester } from './requester';
import { urls } from '../utils/urls';

export const getSearchDataWithPages = (type = 'movie', query, page = 1) => {
    const searchData = requester(urls.search + `/${type}?query=${query}&include_adult=false&language=en-US&page=${page}`);
    return searchData;
};