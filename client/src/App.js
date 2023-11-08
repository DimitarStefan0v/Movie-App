import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root/Root';
import ErrorPage from './pages/Error/Error';
import HomePage from './pages/Home/Home';
import MoviesPage from './pages/Movies/Movies';
import SeriesPage from './pages/Series/Series';
import PeoplePage from './pages/People/People';
import SearchPage from './pages/Search/Search';
import MovieDetailsPage from './pages/Movies/MovieDetails';
import SerieDetailsPage from './pages/Series/SerieDetails';
import PersonDetailsPage from './pages/People/PersonDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'movies', element: <MoviesPage /> },
            { path: 'series', element: <SeriesPage /> },
            { path: 'celebs', element: <PeoplePage /> },
            { path: 'search', element: <SearchPage /> },
            { path: 'movie/:movieId/details', element: <MovieDetailsPage /> },
            { path: 'tv/:serieId/details', element: <SerieDetailsPage /> },
            { path: 'person/:personId/details', element: <PersonDetailsPage /> }
        ]
    }
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
