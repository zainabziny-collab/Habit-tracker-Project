import { useContext } from "react";
import { NewContext } from "../App";
import { BiLogoApple } from "react-icons/bi";

function Header() {
  //////Date//////////////////////////////////////////////////////////////
  const date = new Date().toDateString();

  //////Context//////////////////////////////////////////////////////////////
  const { setShowAddForm } = useContext(NewContext);

  //////return//////////////////////////////////////////////////////////////
  return (
    <header className="w-full h-17 border-b flex items-center justify-between px-5 sm:px-8 md:px-5 lg:px-9 xl:px-12 ">
      <div className="flex items-center">
        <BiLogoApple className="text-[2rem] text-[#00ffe1] " />
        <h1 className="text-[1.7rem] font-bold text-[#00ffe1] ">HabitFlow</h1>
      </div>

      <div className="flex gap-5 items-end justify-center">
        <p className="text-[#8a8a8a] hidden sm:block">Date: {date}</p>
        <button
          className=" h-10 w-25 rounded-[5px] bg-[#00ffe1] shadow-[0_0_10px_0_#00ffe1]/60 font-semibold text-black cursor-pointer hover:bg-[#00ffe1] transition-all duration-200 active:scale-95 "
          onClick={() => {
            setShowAddForm(true);
          }}
        >
          Add Habit
        </button>
      </div>
    </header>
  );
}

export default Header;
