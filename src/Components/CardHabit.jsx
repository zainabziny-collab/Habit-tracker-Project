/////Hooks////////////////////////////////////////////////////////////////
import useAxios from "./Hooks/useAxios";
import axios from "axios";

//////Context//////////////////////////////////////////////////////////////
import { NewContext } from "../App";
import { useState, useContext } from "react";

/////React-Icons/////////////////////////////////////////////////////////
import { BiCaretDown } from "react-icons/bi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import { FaCrown } from "react-icons/fa6";
import { FcOk } from "react-icons/fc";
import { BsClockHistory } from "react-icons/bs";

function CardHabit() {
  const [openId, setOpenId] = useState(null);
  const { activeHabits, handleGet } = useAxios();
  const {
    //////Input-States//////////////////////////////////////////////////////////
    fullDate,
    startDate,
    //////show-form/////////////////////////////////////////////////////////////
    setShowDeleteForm,
    //////other/////////////////////////////////////////////////////////////////
    setElementId,
  } = useContext(NewContext);

  //////handleDoneToday-func////////////////////////////////////////////////////
  let currentStreak = [];
  const handleDoneToday = async (habit) => {
    let updateDoneDays;
    if (habit.doneDays.includes(fullDate)) {
      updateDoneDays = habit.doneDays.filter((day) => day !== fullDate);
    } else {
      updateDoneDays = [...habit.doneDays, fullDate];
    }
    await axios.patch(`http://localhost:3006/Habit/${habit.id}`, {
      doneDays: updateDoneDays,
      streak: Math.max(...currentStreak),
    });
    await handleGet();
  };

  /////////////return////////////////////////////////////////////////////////////
  return activeHabits.map((habit) => {
    const isOpen = openId === habit.id;

    ////////////////dayLeft///////////////////////////////////////////////////////
    const now = new Date();
    const startday = new Date(habit.startDate);
    startday.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    const passedDays = Math.floor((now - startday) / (1000 * 60 * 60 * 24) + 1);
    const leftDays = Math.max(0, habit.day - passedDays);

    /////////////status////////////////////////////////////////////////////////////
    if (leftDays === 0) {
      axios.patch(`http://localhost:3006/Habit/${habit.id}`, {
        status: "completed",
        endDate: fullDate,
      });
      return;
    }
    /////////////streak////////////////////////////////////////////////////////////
    let streak = habit.doneDays.length > 0 ? 1 : 0;
    for (let i = 0; i < habit.doneDays.length - 1; i++) {
      const current = new Date(habit.doneDays[i]);
      const next = new Date(habit.doneDays[i + 1]);
      const dif = (next - current) / (1000 * 60 * 60 * 24);
      if (dif === 1) {
        streak++;
      } else {
        streak = 1;
      }
    }
    currentStreak.push(streak);
    /////////////return/////////////////////////////////////////////////////////////
    return (
      <div
        key={habit.id}
        className={`w-full min-h-56 max-h-0 px-6 pt-5 pb-8 rounded-[5px] flex flex-col gap-4 items-center justify-start bg-[#0d141b] shadow-[0_0_5px_0px_#000] relative overflow-hidden transition-all duration-500 ${isOpen && "max-h-[700px]"}`}
      >
        <div className="w-full flex gap-4 items-center">
          <div
            className={`size-13 text-black text-xl rounded-full flex items-center justify-center bg-linear-to-r ${habit.color.from} ${habit.color.to} ${habit.color.shadow}`}
          >
            {habit.icon}
          </div>
          <div className="flex flex-col">
            <p className="h-5 font-semibold text-[1.1rem]">{habit.name}</p>
            <p className="text-[#8a8a8a]">{habit.describe}</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 ">
          <div className="w-full flex justify-between ">
            <div className="flex gap-1 items-center justify-center ">
              <p className="text-[15px] text-[#8a8a8a]">
                🔥 {streak} day streak
              </p>
            </div>
            <div className="flex gap-1 items-center justify-center ">
              <BsClockHistory className="text-[#8a8a8a] text-[15px]" />
              <p className="text-[15px] text-[#8a8a8a]">{leftDays} day left</p>
            </div>
            <div className="flex gap-1 items-center justify-center ">
              <GoGoal className="text-[#8a8a8a] text-[1.1rem]" />
              <p className="text-[#8a8a8a] text-[15px] px-1">
                {habit.doneDays.length}/{habit.day}
              </p>
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
            onClick={() => {
              handleDoneToday(habit);
            }}
            className={`w-full h-10 bg-linear-to-r relative rounded-[5px] cursor-pointer grid place-items-center ${habit.color.from} ${habit.color.to} ${habit.color.shadow}`}
          >
            <span
              className={`w-[calc(100%-2px)] h-[calc(100%-3px)] flex items-center justify-center gap-1 rounded-[5px] font-semibold transition-all duration-300 ${habit.doneDays.includes(fullDate) ? "bg-transparent" : "bg-[#0d141b]"}`}
            >
              {habit.doneDays.includes(fullDate) && <FcOk />}
              {habit.doneDays.includes(fullDate) ? "Done!" : "Done Today"}
            </span>
          </button>
        </div>
        <button
          onClick={() => {
            setOpenId(openId === habit.id ? null : habit.id);
          }}
          className={`absolute right-1 bottom-1 text-xl text-[#8a8a8a] ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <BiCaretDown />
        </button>
        <button
          onClick={() => {
            setShowDeleteForm(true);
            setElementId(habit.id);
          }}
        >
          <RiDeleteBack2Fill className="absolute top-2 right-2 text-xl text-[#8a8a8a] hover:text-red-500 transition-all duration-200 cursor-pointer active:scale-95" />
        </button>

        <div
          className={`grid w-full grid-cols-7 sm:grid-cols-10 md:grid-cols-5 lg:grid-cols-8 2xl:grid-cols-8 place-items-center gap-2`}
        >
          {Array.from({ length: habit.day }).map((_, index) => {
            const date = new Date(habit.startDate);
            date.setDate(date.getDate() + index);
            const month = date.toLocaleString("en-Us", {
              day: "numeric",
              month: "short",
            });
            const dateString = date.toISOString().split("T")[0];
            return (
              <span
                key={index}
                className={` w-13 h-9 text-[13px] text-black rounded-md flex cursor-pointer items-center justify-center flex-col relative pt-1
                ${habit.doneDays.includes(dateString) ? `${habit.color.shadow} ${habit.color.bg}` : "bg-[#222a32]"}`}
              >
                {startDate === dateString && (
                  <FaCrown
                    className={`absolute top-0 ${habit.color.iconColor}`}
                  />
                )}
                {month}
              </span>
            );
          })}
        </div>
      </div>
    );
  });
}

export default CardHabit;
