import { CircularProgress } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";

export type AuthRouteProps = {
  children: ReactNode | ReactElement;
};

export const AuthRoute: FC<AuthRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { isAuth } = useAuthUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (isAuth) => {
      if (isAuth) {
        setLoading(false);
      } else {
        navigate("/login");
      }
    });
    return () => AuthCheck();
  }, [isAuth]);

  if (loading) return <CircularProgress />;
  return <div>{children}</div>;
};
