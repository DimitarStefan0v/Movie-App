import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root/Root';
import ErrorPage from './pages/Error/Error';
import HomePage from './pages/Home/Home';
import MoviesPage from './pages/Movies/Movies';
import SeriesPage from './pages/Series/Series';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'movies', element: <MoviesPage /> },
            { path: 'series', element: <SeriesPage /> }
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