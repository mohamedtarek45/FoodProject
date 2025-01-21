import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
import { useGetMyUser } from "@/api/MyUserApi";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const {currentUser}=useGetMyUser(isAuthenticated); 
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center gap-2 font-bold">
              <CircleUser className="text-orange-500" />
              {`hello ${currentUser?.user?.name ?? ""}`}
            </span>
          ) : (
            "Welcome to Let'sMakeOrder.com!"
          )}
        </SheetTitle>
        <Separator  className="my-4 border-t-[1px] border-l-black"/>
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={async () => await loginWithRedirect()}
              className="flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
