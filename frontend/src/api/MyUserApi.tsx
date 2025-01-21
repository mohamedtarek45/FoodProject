import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = (isAuthenticated?:boolean) => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyUserRequest = async ():Promise<User>=> {
    const accessToken = await getAccessTokenSilently();
    const ressponse = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    data: currentUser,
    isError,
    isPending,
    // error,
  } = useQuery({ queryKey: [`User`], queryFn: getMyUserRequest ,enabled:isAuthenticated});
  if (isError&&isAuthenticated) {
    toast.error("222");
  }
  return {
    currentUser,
    isError,
    isPending,
  };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const ressponse = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    mutateAsync: createUser,
    isError,
    isPending,
    isSuccess,
  } = useMutation({ mutationFn: createMyUserRequest });
  return {
    createUser,
    isError,
    isPending,
    isSuccess,
  };
};
type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const UpdateMyUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const ressponse = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    mutateAsync: updateeUser,
    isError,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({ mutationFn: UpdateMyUserRequest });
  if (isSuccess) {
    toast.success("user profile updated");
  }
  if (isError) {
    toast.error("88888");
    reset(); //to clear state of error
  }
  return {
    updateeUser,
    isError,
    isPending,
    isSuccess,
    error,
    reset,
  };
};
