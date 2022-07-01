import { useAppSelector } from "./redux-hooks";

export function useAuthUser() {
  const { email, token, id } = useAppSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
