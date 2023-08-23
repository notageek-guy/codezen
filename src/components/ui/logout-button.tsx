import { LogOut } from "lucide-react";
import { Button } from "./button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
function LogoutButton() {
  async function logout() {
    await signOut(auth);
  }
  return (
    <Button onClick={logout} size="icon" variant="outline">
      <LogOut />
    </Button>
  );
}

export default LogoutButton;
