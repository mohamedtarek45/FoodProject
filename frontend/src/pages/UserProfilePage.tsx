import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/userProfileForm";

const UserProfilePage=()=>{
    const {currentUser,isPending:getUserLoading}=useGetMyUser();
    const {isPending:updateUserLoading,updateeUser}=useUpdateMyUser();
    if(getUserLoading){
        return <p>Loading...</p>
    }
    if(!currentUser){
        return <span>Unable to Load user profile</span>
    }

    return (
        <UserProfileForm currentUser={currentUser} isLoading={updateUserLoading} onSave={updateeUser}/>
    )
}
export default UserProfilePage;