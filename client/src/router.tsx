import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HonePage";
import LayoutWebsite from "./layouts/LayoutWebsite";
import MoviePage from "./pages/MoviePage/MoviePage";
import Account from "./auth/Account";
import NewsPage from "./pages/NewsPage/NewsPage";
import LayoutAdmin from "./layouts/LayoutAdmin";
import AddMovies from "./pages/admin/Movie management/AddMovies";
import EditMovies from "./pages/admin/Movie management/EditMovies";
import MovieTable from "./pages/admin/Movie management/MovieTable";
import ListDirector from "./pages/admin/DirectorMng/ListDirector";
import AddDirector from "./pages/admin/DirectorMng/AddDirector";
import EditDirector from "./pages/admin/DirectorMng/EditDirector";
import ListGenre from "./pages/admin/GenreMng/ListGenre";
import AddGenre from "./pages/admin/GenreMng/AddGenre";
import Actor from "./pages/admin/Actor/List-Actor";
import AddActor from "./pages/admin/Actor/Add-Actor";
import EditActor from "./pages/admin/Actor/Edit-Actor";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import EditAcount from "./pages/admin/Acount/EditAcount";
import ListAcount from "./pages/admin/Acount/ListAcount";
import EditGenre from "./pages/admin/GenreMng/EditGenre";
export const router = createBrowserRouter([
        {
                path: '', element: <LayoutWebsite />, children: [
                        { path: '', element: <HomePage /> },
                        { path: 'poly-movies', element: <MoviePage /> },
                        { path: 'poly-acount', element: <Account /> },
                        { path: 'poly-news', element: <NewsPage /> },
                        { path: 'poly-moviesDetail/:id', element: <MovieDetail /> },
                ]
        },
        {
                path: 'admin', element: <LayoutAdmin />, children: [
                                        { path: "actors", element: <Actor /> },
                                        { path: "actors/add", element: < AddActor /> },
                                        { path: "actors/:id/edit", element: < EditActor /> },
                                        { path: "genres", element: <ListGenre /> },
                                        { path: "genres/add", element: <AddGenre /> },
                                        { path: "genres/:id/edit", element: <EditGenre /> },
                                        { path: "movies/create", element: <AddMovies /> },
                                        { path: "movies", element: <MovieTable /> },
                                        { path: "movies/:id/edit", element: <EditMovies /> },
                                        { path: 'director', element: <ListDirector /> },
                                        { path: 'director/add', element: <AddDirector /> },
                                        { path: 'director/:id/edit', element: <EditDirector /> },
                                        { path: 'acount/:id/edit', element: <EditAcount /> },
                                        { path: 'acount', element: <ListAcount /> },
                ]
        }
])
