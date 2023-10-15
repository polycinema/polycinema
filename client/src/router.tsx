import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage/HonePage";

import LayoutWebsite from "./layouts/LayoutWebsite";
import MoviePage from "./pages/MoviePage/MoviePage";
import Account from "./auth/Account";
import NewsPage from "./pages/NewsPage/NewsPage";
export const router = createBrowserRouter([
        {path:'', element:<LayoutWebsite/>, children:[
                {path:'', element:<HomePage/>},
                {path:'poly-movies',element:<MoviePage/>},
                {path:'poly-acount',element:<Account/>},
                {path:'poly-news',element:<NewsPage/>},
        ]}


])