import React from "react";

function Loader() {
  return (
    <div className="relative min-h-[100px] h-full m-auto">
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-black border-t-transparent h-12 w-12 animate-spin" />
      </div>
    </div>
  );
}

export default Loader;
