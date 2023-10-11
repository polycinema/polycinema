import { createBrowserRouter } from "react-router-dom";

import ListMovie from "./components/listmovie/ListMovie";
import Account from "./auth/Account";
import InfoAccount from "./components/userinfo/InfoAccount";

export const router = createBrowserRouter([
        {path:'', element:<ListMovie/>},
        {path:'/account', element:<Account/>},
        {path:'/account/info', element:<InfoAccount/>},
])