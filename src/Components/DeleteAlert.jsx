import { useContext } from "react";
import { NewContext } from "../App";
import useAxios from "./Hooks/useAxios";

function DeleteAlert() {
  const { setShowDeleteForm } = useContext(NewContext);
  const { handleDelete } = useAxios("");
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-100 grid place-items-center backdrop-blur-[5px] ">
      <div className="w-100 h-50 shadow-[0_0_8px_0px_#ffffff]/25 bg-gray-950 rounded-md flex flex-col gap-4 px-7 py-7 items-center justify-center">
        <p className="text-[1.1rem] font-semibold ">
          Are you sure you want to delete?
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            className="px-8.5 py-2 rounded-md text-[1rem] font-semibold cursor-pointer bg-[#00ffe1] text-black hover:shadow-[0_0_11px_2px_#00ffe1]/60 active:scale-95 transition-all duration-200 "
            onClick={() => {
              handleDelete();
              setShowDeleteForm(false);
            }}
          >
            Yes
          </button>
          <button
            className="px-8.5 py-2 rounded-md text-[1rem] font-semibold cursor-pointer bg-[#00ffe1] text-black hover:shadow-[0_0_11px_2px_#00ffe1]/60 active:scale-95 transition-all duration-200 "
            onClick={() => {
              setShowDeleteForm(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAlert;
