import React from "react";
import Link from "next/link"; 

function DesktopFooter() {
  return (
    <footer className="w-full mt-[20px] pb-">
      <div className="mx-auto flex flex-col items-center">
        <div className="text-center text-sm text-[black] font-semibold p-[5px]">
          &copy; 2024{" "}
          <Link href="https://www.ardakeyisoglu.com/" target="_blank">
            Arda Keyişoğlu.
          </Link>
          {" "}All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default DesktopFooter;
