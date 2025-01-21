import {useCreateMyUser} from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser=useRef(false);
  const nav=useNavigate();
  useEffect(() => {
    const func = async () => {
      if (user?.sub && user.email && !hasCreatedUser.current) {
        await createUser({
          auth0Id: user.sub,
          email: user.email,
        });
        hasCreatedUser.current=true;
      }
    };
    func();
    nav("/")
  }, [createUser, nav, user]);


  return <p>loading........</p>
};
export default AuthCallbackPage;
