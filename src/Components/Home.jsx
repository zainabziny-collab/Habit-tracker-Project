import { IoLayers } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAxios from "./Hooks/useAxios";
//////context/////////////////////////////////////////////////////////////
import { useContext } from "react";
import { NewContext } from "../App";

//////Components/////////////////////////////////////////////////////////////
import CardHabit from "./CardHabit";
import AddHabit from "./AddHabit";
import DeleteAlert from "./DeleteAlert";
import Header from "./Header";
//////chart/////////////////////////////////////////////////////////////
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BiBorderRadius } from "react-icons/bi";
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  //////Context/////////////////////////////////////////////////////////////
  const { fullDate, showAddForm, showDeleteForm } = useContext(NewContext);

  /////Hook////////////////////////////////////////////////////////////////
  const { habits, activeHabits, completedHabits } = useAxios();

  //////doneToday////////////////////////////////////////////////////////////
  let doneTodayArray = activeHabits.map((habit) =>
    habit.doneDays.includes(fullDate),
  );
  const doneToday = doneTodayArray.filter((item) => item === true);

  //////longestStreak////////////////////////////////////////////////////////////
  let longestStreak = habits.map((habit) => habit.streak);
  const progress =
    doneToday.length === 0
      ? 0
      : Math.round((100 / activeHabits.length) * doneToday.length);

  //////data-chart/////////////////////////////////////////////////////////////
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ["#00ffe1", "#E5E7EB"],
        borderWidth: 0,
        cutout: "75%",
        borderRadius: 8,
        spacing: 2,
      },
    ],
  };

  //////options-chart/////////////////////////////////////////////////////////////
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  //////return////////////////////////////////////////////////////////////////////
  return (
    <div className="text-white w-full min-h-screen bg-gray-950 relative flex justify-center items-start pb-16 ">
      <div className="w-full flex flex-col items-end justify-start">
        <Header />
        <Link to="/doneHabitPage">
          <button className=" text-2xl font-bold cursor-pointer text-[#00ffe1] transition-all duration-200 active:scale-95 my-3 mx-6">
            Completed Habits({completedHabits.length})
          </button>
        </Link>

        <div className="w-full min-h-130 px-5 sm:px-8 md:px-5 lg:px-9 xl:px-12 ">
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-7 md:gap-18 ">
            <div className="w-66 flex flex-col justify-start items-center">
              <div className="w-full flex items-center justify-between">
                <div className="size-33 relative border text-black">
                  <Doughnut
                    className="size-full"
                    data={data}
                    options={options}
                  />
                  <p className="absolute text-white top-13 right-12 ">{progress}%</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#8a8a8a]">Completed Goals</p>
                  <div className="flex gap-1 items-end">
                    <p className="text-xl font-semibold">
                      {doneToday.length}/{activeHabits.length}
                    </p>
                    <p className="text-[#8a8a8a] text-[15px]">Done</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-65 h-fit flex flex-col items-center justify-center gap-6 md:gap-8 ">
              <div className="w-full h-fit flex justify-between items-end ">
                <div className="flex justify-start gap-5 ">
                  <IoLayers className="text-[1.4rem] rounded-full text-[#00ffe1] shadow-[0_0_1px_10px_#111a24] bg-[#111a24] " />
                  <h2> Total Habits</h2>
                </div>
                <p className="font-bold text-2xl">{activeHabits.length}</p>
              </div>
              <div className="w-full h-fit flex justify-between items-end">
                <div className="w-full flex justify-start gap-5 ">
                  <p className="text-[1.2rem] rounded-full text-yellow-500 shadow-[0_0_1px_8px_#111a24] bg-[#111a24]">
                    🔥
                  </p>
                  <h2> Longest Streak</h2>
                </div>
                <p className="font-bold text-2xl">
                  {Math.max(...longestStreak)}
                </p>
              </div>
            </div>
          </div>
          <p className="w-full text-center py-5">
            {progress === 100 &&
              "🎉Amazing! you've completed all of your habits today!"}
          </p>
          <h1 className="w-full text-2xl font-bold mb-3">Active Habits</h1>
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 place-items-start gap-5">
            <CardHabit />
          </div>
        </div>
      </div>
      {showAddForm && <AddHabit />}
      {showDeleteForm && <DeleteAlert />}
    </div>
  );
};

export default Home;
