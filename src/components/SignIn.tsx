import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../app/userSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { SimpleForm } from "./SimpleForm";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/profile");
      })
      .catch(() => alert("Invalid user!"));
  };

  return <SimpleForm title="sign in" handleClick={handleLogin} />;
};
