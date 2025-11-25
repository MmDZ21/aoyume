import Image from "next/image";
import React from "react";

const Topbar = () => {
  return <div>
    {/* logo and nav */}
    <div>
        
        <Image src="/logo.png" alt="Aoyume" width={40} height={40} className="hidden md:block"/>
        <Image src="/logo.png" alt="Aoyume" width={36} height={36} className="md:hidden"/>
    </div>
    {/* search and sign in/register buttons */}
    <div></div>
  </div>;
};

export default Topbar;
