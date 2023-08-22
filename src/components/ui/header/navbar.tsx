import React from "react";
import LangSwitcher from "../switcher/LangSwitcher";
import ThemeSwitcher from "../switcher/ThemeSwitcher";
import { ModeToggle } from "@/components/mode-toggle";
// import Settings from "../settings/Settings";

import LogoutButton from "../logout-button";
function Navbar() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-4">
      <div className="flex items-center gap-x-2">
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
      <div className=" items-center  flex gap-x-2 ">

        {/* fix the settings */}
        
        {/* <Settings /> */}
        <ModeToggle />
        <LogoutButton />
      </div>
    </div>
  );
}

export default Navbar;
