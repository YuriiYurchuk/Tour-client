import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Authorization.module.scss";
import AuthContent from "@components/Authorization/AuthContent";
import Login from "@components/Authorization/Login";
import Register from "@components/Authorization/Register";

const AuthorizationPage = () => {
  const authState = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister((prevState) => !prevState);
  };

  useEffect(() => {
    if (authState.accessToken) {
      navigate("/", { replace: true });
    }
  }, [authState.accessToken, navigate]);

  return (
    <section className={styles["auth-container"]}>
      <article className={styles["auth-content"]}>
        <AuthContent />
        {isRegister ? (
          <Register toggleForm={toggleForm} />
        ) : (
          <Login toggleForm={toggleForm} />
        )}
      </article>
    </section>
  );
};

export default AuthorizationPage;
