import { requester } from './requester';
import { urls } from '../utils/urls';

export const getPeopleWithPages = (page = 1) => {
    const people = requester(urls.people + `&page=${page}`);
    return people;
};