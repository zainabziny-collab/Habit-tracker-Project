/////Hook///////////////////////////////////////////////////////////////////////
import useAxios from "./Hooks/useAxios";
import axios from "axios";

//////Context///////////////////////////////////////////////////////////////////
import { NewContext } from "../App";
import { useContext } from "react";

/////React-Icons////////////////////////////////////////////////////////////////
import { GoGoal } from "react-icons/go";
import { BsClockHistory } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { MdRestartAlt } from "react-icons/md";

function DoneCardHabit() {
  const { completedHabits, handleGet } = useAxios();

  //////Input-States//////////////////////////////////////////////////////////////
  const { doneDays, streak, status, startDate } = useContext(NewContext);

  //////restart-Habit-func////////////////////////////////////////////////////////
  const restartHabit = async (habit) => {
    await axios.patch(`http://localhost:3006/Habit/${habit.id}`, {
      status: status,
      streak: streak,
      startDate: startDate,
      endDate: "",
      doneDays: doneDays,
    });
    await handleGet();
  };

  //////return///////////////////////////////////////////////////////////////////
  return completedHabits.map((habit) => (
    <div
      key={habit.id}
      className={`w-full h-60 px-6 pt-5 pb-10 rounded-[5px] flex flex-col gap-4 items-center justify-start bg-[#0d141b] shadow-[0_0_5px_0px_#000] relative transition-all duration-500`}
    >
      <div className="absolute right-6 flex gap-1 items-center ">
        <button
          onClick={() => {
            restartHabit(habit);
          }}
          className="cursor-pointer rounded-md text-[#328732] transition-all duration-200 active:scale-95 flex items-center "
        >
          <MdRestartAlt />
          <span className="pb-1">restart</span>
        </button>
      </div>

      <div className="w-full flex gap-4 items-center">
        <div
          className={`size-13 text-black text-xl rounded-full flex items-center justify-center bg-linear-to-r ${habit.color.from} ${habit.color.to} ${habit.color.shadow}`}
        >
          {habit.icon}
        </div>
        <div className="flex flex-col">
          <p className="h-5 font-semibold text-[1.1rem]">{habit.name}</p>
          <p className="text-[#8a8a8a]">{habit.descript}</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 ">
        <div className="w-full flex justify-between">
          <div className="w-fit flex items-start flex-col">
            <p className=" text-[15px] text-[#8a8a8a]">
              Start Date: <span className="text-[14px]">{habit.startDate}</span>
            </p>
            <p className="text-[15px] text-[#8a8a8a]">
              End Date: <span className="text-[14px]">{habit.endDate}</span>
            </p>
          </div>

          <div className="w-fit flex items-start justify-start flex-col">
            <div className="flex gap-1 items-center">
              <GoGoal className="text-[#8a8a8a] text-[1.1rem]" />
              <p className="text-[#8a8a8a] text-[15px]">
                {habit.doneDays.length}/{habit.day} day done
              </p>
            </div>

            <div className="flex gap-1 items-center pl-[0.5px] ">
              <BsClockHistory className="text-[#8a8a8a] text-[15px]" />
              <p className="text-[15px] text-[#8a8a8a]">
                {habit.day - habit.doneDays.length} day not done
              </p>
            </div>
          </div>
        </div>

        <div className=" w-full h-4 flex gap-4 items-center ">
          <div className="w-full h-2 rounded-xl bg-[#000000] ">
            <div
              style={{
                width: `${Math.round((100 / habit.day) * habit.doneDays.length)}%`,
              }}
              className={`h-full rounded-xl bg-linear-to-r ${habit.color.from} ${habit.color.to} ${habit.color.shadow}`}
            ></div>
          </div>
          <p className="text-[#8a8a8a] pb-1 ">
            {Math.round((100 / habit.day) * habit.doneDays.length)}%
          </p>
        </div>
      </div>
      <div className="w-full">
        <button
          className={`w-full h-10 bg-linear-to-r rounded-[5px] font-semibold flex items-center justify-center gap-1 ${habit.color.from} ${habit.color.to} ${habit.color.shadow}`}
        >
          <FcOk />
          Completed!
        </button>
      </div>
    </div>
  ));
}

export default DoneCardHabit;
