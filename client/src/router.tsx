import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LayoutWebsite from "./layouts/LayoutWebsite";
import MoviePage from "./pages/MoviePage/MoviePage";
import Account from "./auth/Account";
import NewsPage from "./pages/NewsPage/NewsPage";
import LayoutAdmin from "./layouts/LayoutAdmin";
import AddMovies from "./pages/admin/MovieMng/AddMovies";
import EditMovies from "./pages/admin/MovieMng/EditMovies";
import MovieTable from "./pages/admin/MovieMng/MovieTable";
import ListDirector from "./pages/admin/DirectorMng/ListDirector";
import AddDirector from "./pages/admin/DirectorMng/AddDirector";
import EditDirector from "./pages/admin/DirectorMng/EditDirector";
import ListGenre from "./pages/admin/GenreMng/ListGenre";
import AddGenre from "./pages/admin/GenreMng/AddGenre";
import EditGenre from "./pages/admin/GenreMng/EditGenre";
import AddActor from "./pages/admin/Actor/Add-Actor";
import EditActor from "./pages/admin/Actor/Edit-Actor";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import EditAcount from "./pages/admin/Acount/EditAcount";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ListRooms from "./pages/admin/Room/List-Room";
import AddRoom from "./pages/admin/Room/Add-Room";
import EditRoom from "./pages/admin/Room/Edit-Room";
import ShowTimeMng from "./pages/admin/Showtime/ShowTimeMng";
import CreateShowTime from "./pages/admin/Showtime/CreateShowTime";
import UpdateShowTime from "./pages/admin/Showtime/UpdateShowTime";
import ListActor from "./pages/admin/Actor/List-Actor";
import AddAcount from "./pages/admin/Acount/AddAcount";
import AddNews from "./pages/admin/News/Add-News";
import ListPost from "./pages/admin/News/List-News";
import EditNews from "./pages/admin/News/Update-News";
import AddProduct from "./pages/admin/Product/Add-Product";
import ListProduct from "./pages/admin/Product/List-Product";
import EditProduct from "./pages/admin/Product/Edit-Product";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import NewDetailPage from "./pages/NewsPage/NewDetailPage";
import PaymentPage from "./pages/PaymentPage";
import ListBanner from "./pages/admin/Banner/List";
import AddBanner from "./pages/admin/Banner/Add";
import EditBanner from "./pages/admin/Banner/Edit";
import PayementReturnPage from "./pages/PaymentReturnPage";
import MemberPage from "./pages/MemberPage";
import ListsBooking from "./pages/admin/ListBooking";
import PrivateRouterAdmin from "./components/privateRouter/PrivateRouterAdmin";
import PrivateRouterCheckout from "./components/privateRouter/PrivateRouterCheckout";
import ResetPassword from "./auth/ResetPassword";
import CouponMng from "./pages/admin/Coupon/CouponMng";
import AddCoupon from "./pages/admin/Coupon/AddCoupon";
import EditCoupon from "./pages/admin/Coupon/EditCoupon";
import ListAcountUser from "./pages/admin/Acount/ListAcountUser";
import ListAcountAdmin from "./pages/admin/Acount/ListAcoutAdmin";
import PrivateRouterSeat from "./components/privateRouter/PrivateRouterSeat";
import StatisticPage from "./pages/admin/StatisticPage/StatisticPage";
import SeatTypeMng from "./pages/admin/SeatType/SeatTypeMng";
import AddSeatType from "./pages/admin/SeatType/AddSeatType";
import EditSeatType from "./pages/admin/SeatType/EditSeatType";
import DashBoard from "./pages/admin/DashBoard";

export const router = createBrowserRouter([
  { path: "*", element: <NotFoundPage /> },
  {
    path: "",
    element: <LayoutWebsite />,
    children: [
      {
        path: "",
        element: <PrivateRouterSeat />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "poly-movies", element: <MoviePage /> },
          { path: "poly-acount", element: <Account /> },
          { path: "reset-password", element: <ResetPassword /> },
          { path: "poly-news", element: <NewsPage /> },
          { path: "poly-news/:id", element: <NewDetailPage /> },
          { path: "movies/:slug/detail", element: <MovieDetail /> },
          { path: "poly-moviesDetail/:id", element: <MovieDetail /> },
        ],
      },
      {
        path: "",
        element: <PrivateRouterCheckout />,
        children: [
          { path: "poly-checkout/:id", element: <CheckoutPage /> },
          { path: "poly-payment", element: <PaymentPage /> },
          { path: "payment-return", element: <PayementReturnPage /> },
          {
            path: "",
            element: <PrivateRouterSeat />,
            children: [{ path: "poly-member", element: <MemberPage /> }],
          },
        ],
      },
    ],
  },
  {
    path: "",
    element: <PrivateRouterSeat />,
    children: [
      {
        path: "/admin",
        element: <PrivateRouterAdmin />,
        children: [
          {
            element: <LayoutAdmin />,
            children: [
              { index: true, element: <DashBoard /> },
              { path: "dashboard", element: <DashBoard /> },
              { path: "statistic", element: <StatisticPage /> },
              { path: "booking", element: <ListsBooking /> },
              { path: "rooms", element: <ListRooms /> },
              { path: "rooms/add", element: <AddRoom /> },
              { path: "rooms/:id/edit", element: <EditRoom /> },
              { path: "actors", element: <ListActor /> },
              { path: "actors/add", element: <AddActor /> },
              { path: "actors/:id/edit", element: <EditActor /> },
              { path: "genres", element: <ListGenre /> },
              { path: "genres/add", element: <AddGenre /> },
              { path: "genres/:id/edit", element: <EditGenre /> },
              { path: "movies/create", element: <AddMovies /> },
              { path: "movies", element: <MovieTable /> },
              { path: "movies/:id/edit", element: <EditMovies /> },
              { path: "director", element: <ListDirector /> },
              { path: "director/add", element: <AddDirector /> },
              { path: "director/:id/edit", element: <EditDirector /> },
              { path: "acount/:id/edit", element: <EditAcount /> },
              { path: "acountUser", element: <ListAcountUser /> },
              { path: "acountAdmin", element: <ListAcountAdmin /> },
              { path: "showtime", element: <ShowTimeMng /> },
              { path: "showtime/add", element: <CreateShowTime /> },
              { path: "showtime/:id/edit", element: <UpdateShowTime /> },
              { path: "addAcount", element: <AddAcount /> },
              { path: "news/add", element: <AddNews /> },
              { path: "news", element: <ListPost /> },
              { path: "news/:id/edit", element: <EditNews /> },
              { path: "products/add", element: <AddProduct /> },
              { path: "products", element: <ListProduct /> },
              { path: "products/:id/edit", element: <EditProduct /> },
              { path: "banner", element: <ListBanner /> },
              { path: "banner/add", element: <AddBanner /> },
              { path: "banner/:id/edit", element: <EditBanner /> },
              { path: "coupon", element: <CouponMng /> },
              { path: "coupon/add", element: <AddCoupon /> },
              { path: "coupon/:id/edit", element: <EditCoupon /> },
              { path: "seats", element: <SeatTypeMng /> },
              { path: "seats/add", element: <AddSeatType /> },
              { path: "seats/:id/edit", element: <EditSeatType /> },
            ],
          },
        ],
      },
    ],
  },
]);
