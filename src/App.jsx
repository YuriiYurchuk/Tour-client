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
const ProfilePage = preload(() => import("@pages/Profile/Profile"));
const TourSelectionPage = preload(() =>
  import("@pages/TourSelection/TourSelection")
);
const TourHotPage = preload(() => import("@pages/TourHot/TourHot"));
const HotelDetailsPage = preload(() =>
  import("@pages/HotelDetails/HotelDetails")
);
const MapsPage = preload(() => import("@pages/Map/Maps"));
const Payment = preload(() => import("@pages/Payment/Payment"));
const CountriesPage = preload(() => import("@pages/Countries/Countries"));
const HotelsPage = preload(() => import("@pages/Hotels/Hotels"));
const ServicesDetails = preload(() =>
  import("@components/DataFilling/ServicesDetails")
);
const PersonalDetails = preload(() =>
  import("@components/DataFilling/PersonalDetails")
);
const PaymentDetails = preload(() =>
  import("@components/DataFilling/PaymentDetails")
);

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
    element: <TourSelectionPage />,
  },
  {
    path: "/hot-tours",
    element: <TourHotPage />,
  },
  {
    path: "/tour-selection/:id/:hotelName",
    element: <HotelDetailsPage />,
  },
  {
    path: "/maps",
    element: <MapsPage />,
  },
  {
    path: "/countries",
    element: <CountriesPage />,
  },
  {
    path: "/hotels",
    element: <HotelsPage />,
  },
  {
    path: "/tour-payment",
    element: <Payment />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    wrapper: PrivateRoute,
  },
  {
    path: "/booking/:bookingId/services",
    element: <ServicesDetails />,
    wrapper: PrivateRoute,
  },
  {
    path: "/booking/:bookingId/personal",
    element: <PersonalDetails />,
    wrapper: PrivateRoute,
  },
  {
    path: "/booking/:bookingId/payment",
    element: <PaymentDetails />,
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
