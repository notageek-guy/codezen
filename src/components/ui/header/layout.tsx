import React from "react";
import Navbar from "./navbar";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 ">{props.children}</main>
    </div>
  );
}

export default Layout;
