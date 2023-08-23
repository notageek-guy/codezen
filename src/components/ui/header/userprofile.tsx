
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { Link } from "react-router-dom";
function UserProfile() {
  const [user] = useAuthState(auth);
  return (
    <Link to="/profile">
      <Avatar>
        <AvatarImage
          src={user?.photoURL || "https://api.dicebear.com/6.x/micah/svg"}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
}

export default UserProfile;
