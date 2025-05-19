import CustomLayout from "@/components/customLayout";
import Image from "next/image";
import React from "react";

const Nav = () => {
  return (
    <div className="p-4 bg-primary shadow-lg">
      <CustomLayout>
        <Image
          src={"/logo.png"}
          width={40}
          height={40}
          alt="Space Station Logo"
          className="rounded-lg"
        />
      </CustomLayout>
    </div>
  );
};

export default Nav;
