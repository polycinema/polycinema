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
import EditGenre from "./pages/admin/GenreMng/EditGenre";
import AddActor from "./pages/admin/Actor/Add-Actor";
import EditActor from "./pages/admin/Actor/Edit-Actor";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import EditAcount from "./pages/admin/Acount/EditAcount";
import ListAcount from "./pages/admin/Acount/ListAcount";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ListRooms from "./pages/admin/Room/List-Room";
import AddRoom from "./pages/admin/Room/Add-Room";
import EditRoom from "./pages/admin/Room/Edit-Room";
import AddAcount from "./pages/admin/Acount/AddAcount";
import ListActor from "./pages/admin/Actor/List-Actor";
import AddNews from "./pages/admin/News/Add-News";
import ListNews from "./pages/admin/News/List-News";
import EditNews from "./pages/admin/News/Update-News";
import ListPost from "./pages/admin/News/List-News";
import AddProduct from "./pages/admin/Product/Add-Product";
import ListProduct from "./pages/admin/Product/List-Product";
import EditProduct from "./pages/admin/Product/Edit-Product";

export const router = createBrowserRouter([
        {path: '*', element: <NotFoundPage/>},
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
                                        {path: "rooms", element: <ListRooms/>},
                                        {path: "rooms/add", element: <AddRoom/>},
                                        {path: "rooms/:id/edit", element: <EditRoom/>},
                                        { path: "actors", element: <ListActor /> },
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
                                        { path: 'addAcount', element: <AddAcount /> },
                                        { path: 'news/add', element: <AddNews /> },
                                        { path: 'news', element: <ListPost /> },
                                        { path: 'news/:id/edit', element: <EditNews /> },
                                        { path: 'products/add', element: <AddProduct /> },
                                        { path: 'products', element: <ListProduct /> },
                                        { path: 'products/:id/edit', element: <EditProduct /> },

                ]
        }
]);

