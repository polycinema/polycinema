import { createBrowserRouter } from "react-router-dom";
import ListMovie from "./components/listmovie/ListMovie";

export const router = createBrowserRouter([
        {path:'', element:<ListMovie/>}
])