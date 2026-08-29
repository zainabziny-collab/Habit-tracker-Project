import { Link } from "react-router-dom";

//////Context//////////////////////////////////////////////////////////////
import { useContext } from "react";
import { NewContext } from "../App";

//////Components/////////////////////////////////////////////////////////
import Header from "./Header";
import AddHabit from "./AddHabit";
import DoneCardHabit from "./DoneCardHabit";

function DoneHabitsPage() {
  const { showAddForm } = useContext(NewContext);
  return (
    <div className="text-white w-full min-h-screen bg-gray-950 relative flex justify-center items-start pb-16">
      <div className="w-full flex flex-col items-end ">
        <Header />
        <Link to="/">
          <button className=" text-2xl font-bold cursor-pointer text-[#00ffe1] transition-all duration-200 active:scale-95 my-4 mx-6">
            Active Habits
          </button>
        </Link>
        <div className="w-full min-h-130 mt-1 px-8 sm:px-22 md:px-5 lg:px-4 xl:px-4 ">
          <h1 className="w-full text-2xl font-bold mb-3">
            Completed Habits
          </h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-5 lg:gap-3">
            <DoneCardHabit />
          </div>
        </div>
      </div>
      {showAddForm && <AddHabit />}
    </div>
  );
}

export default DoneHabitsPage;
