import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HonePage";
import LayoutWebsite from "./layouts/LayoutWebsite";
import MoviePage from "./pages/MoviePage/MoviePage";
import Account from "./auth/Account";
import NewsPage from "./pages/NewsPage/NewsPage";
import LayoutAdmin from "./layouts/LayoutAdmin";
import ListGenre from "./pages/admin/GenreMng/ListGenre";
import AddGenre from "./pages/admin/GenreMng/AddGenre";
export const router = createBrowserRouter([
        {path:'', element:<LayoutWebsite/>, children:[
                {path:'', element:<HomePage/>},
                {path:'poly-movies',element:<MoviePage/>},
                {path:'poly-acount',element:<Account/>},
                {path:'poly-news',element:<NewsPage/>},
        ]},
        {path: 'admin', element: <LayoutAdmin/>,children:[
                {path:'genres',element:<ListGenre/>},
                {path:'genres/add',element:<AddGenre/>},
                {path:'genres/:id/edit',element:<ListGenre/>},

        ]}

])

