import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import { restoreUserFromToken } from "../../redux/slices/authSlice";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(restoreUserFromToken());
  }, [dispatch]);

  const hideHeaderRoutes = ["/auth"];
  const hideFooterRoutes = ["/auth", "/maps"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main key={location.pathname}>
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
      <ToastContainer />
    </>
  );
};
