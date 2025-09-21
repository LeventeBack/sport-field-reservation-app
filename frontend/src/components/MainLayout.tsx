import React from "react";
import NavigationBar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar />
      <main className="py-5">{children}</main>
    </>
  );
};

export default MainLayout;
