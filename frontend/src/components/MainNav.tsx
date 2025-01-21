import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <span className="flex space-x-2 items-center">
      <>
        <Link to="/order-status" className="font-bold hover:text-orange-500">Order Status</Link>
        <UserNameMenu />
      </>
    </span>
  ) : (
    <Button
      variant="ghost"
      onClick={async () => await loginWithRedirect()}
      className="hover:text-orange-500 text-lg font-bold hover:bg-white"
    >
      Login
    </Button>
  );
};

export default MainNav;
