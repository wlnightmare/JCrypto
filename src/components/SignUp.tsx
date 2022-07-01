import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setUser } from "../app/userSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { SimpleForm } from "./SimpleForm";

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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

  return <SimpleForm title="sign in" handleClick={handleRegister} />;
};
