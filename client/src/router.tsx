import { createBrowserRouter } from "react-router-dom";

import ListMovie from "./components/listmovie/ListMovie";
import LayoutWebsite from "./layouts/LayoutWebsite";
export const router = createBrowserRouter([
        {path:'', element:<LayoutWebsite/>, children:[
                {path:'', element:<ListMovie/>}
        ]}
])