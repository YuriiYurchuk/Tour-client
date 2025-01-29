import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@components/Layout/Layout";
import Loader from "@components/Loader/Loader";
import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";
import { ScrollToTop } from "@components/ScrollToTop/ScrollToTop";

const preload = (importFunc) => {
  const Component = lazy(importFunc);
  Component.preload = importFunc;
  return Component;
};

const HomePage = preload(() => import("@pages/Home/Home"));
const AuthorizationPage = preload(() =>
  import("@pages/Authorization/Authorization")
);
const AboutPage = preload(() => import("@pages/AboutUs/AboutUs"));
const ContactsPage = preload(() => import("@pages/Contacts/Contacts"));
const ReviewsPage = preload(() => import("@pages/Reviews/Reviews"));
const Profile = preload(() => import("@pages/Profile/Profile"));
const TourSelection = preload(() =>
  import("@pages/TourSelection/TourSelection")
);
const TourHot = preload(() => import("@pages/TourHot/TourHot"));
const HotelDetails = preload(() => import("@pages/HotelDetails/HotelDetails"));
const Maps = preload(() => import("@pages/Map/Maps"));

const routes = [
  {
    path: "/auth",
    element: <AuthorizationPage />,
    wrapper: PublicRoute,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about-us",
    element: <AboutPage />,
  },
  {
    path: "/contacts",
    element: <ContactsPage />,
  },
  {
    path: "/reviews",
    element: <ReviewsPage />,
  },
  {
    path: "/tour-selection",
    element: <TourSelection />,
  },
  {
    path: "/hot-tours",
    element: <TourHot />,
  },
  {
    path: "/tour-selection/:id/:hotelName",
    element: <HotelDetails />,
  },
  {
    path: "/maps",
    element: <Maps />,
  },
  {
    path: "/profile",
    element: <Profile />,
    wrapper: PrivateRoute,
  },
];

routes.forEach(({ element }) => {
  if (element.type?.preload) {
    element.type.preload();
  }
});

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader isLoading={true} />}>
            <Layout />
            <ScrollToTop />
          </Suspense>
        }
      >
        {routes.map(({ path, element, wrapper: Wrapper }) => (
          <Route
            key={path}
            path={path}
            element={Wrapper ? <Wrapper>{element}</Wrapper> : element}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
