import { createBrowserRouter } from "react-router-dom";

import ListMovie from "./components/listmovie/ListMovie";
import LayoutWebsite from "./layouts/LayoutWebsite";
import BannerMovie from "./components/banner/BannerMovie";

export const router = createBrowserRouter([
        {path:'', element:<LayoutWebsite/>, children:[
                {path:'/banner', element:<BannerMovie/>},
                {path:'', element:<ListMovie/>},
        ]}
])