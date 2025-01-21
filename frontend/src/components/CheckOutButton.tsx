import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/userProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckOut: (userFzormData: UserFormData) => void;
  disapled: boolean;
  isLoading:boolean;
};

const CheckOutButton = ({ onCheckOut, disapled ,isLoading:checkedOutLoading}: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser, isPending } = useGetMyUser();
  const onLogin = async () => {
    await loginWithRedirect({ appState: { returnTo: pathname } });
  };

  if (!isAuthenticated) {
    return (
      <Button className="bg-orange-500 flex-1 " onClick={onLogin}>
        Log in to check out
      </Button>
    );
  }
  if (isLoading || !currentUser||checkedOutLoading) {
    return <LoadingButton value="please wait" />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disapled} className="bg-orange-500 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[720px] bg-gray-50">
        <DialogTitle>Checkout Form</DialogTitle>
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckOut}
          isLoading={isPending}
          title="Confirm delivery details"
          bottonText="Continue to payment "
        />
      </DialogContent>
    </Dialog>
  );
};
export default CheckOutButton;
