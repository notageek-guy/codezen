import React from "react";
import LangSwitcher from "../switcher/LangSwitcher";
import ThemeSwitcher from "../switcher/ThemeSwitcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "../button";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
function Navbar() {
  async function logout() {
    await signOut(auth);
  }
  return (
    <div className="flex items-center justify-between w-full px-4 py-4">
      <div className="flex items-center gap-x-2">
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
      <div className=" items-center  flex gap-x-2 ">
        <ModeToggle />
        <Button onClick={logout} size="icon" variant="outline">
          <LogOut />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
