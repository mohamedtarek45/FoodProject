import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useGetMyUser } from "@/api/MyUserApi";

const UserNameMenu = () => {
  const {logout } = useAuth0();
  const {currentUser}=useGetMyUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center px-3 font-bold hover:text-orange-500 gap-2"
      >
        <CircleUser className="text-orange-500" />
        {`hello ${currentUser?.user?.name ?? ""}`}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/" className="font-bold hover:text-orange-500">
            Home Page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
            Manage Resturant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button className="flex flex-1 font-bold bg-orange-500" onClick={async()=>logout()}> 
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserNameMenu;
