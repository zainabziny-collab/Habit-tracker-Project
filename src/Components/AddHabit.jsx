import { NewContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import useAxios from "./Hooks/useAxios";

function AddHabit() {
  const { handleSubmit } = useAxios("");
  const [error, setError] = useState("");
  const {
    //////Input-States//////////////////////////////////////////////////////////
    name,
    setName,
    describe,
    setDescribe,
    day,
    setDay,
    icon,
    setIcon,
    setColor,
    //////show-form/////////////////////////////////////////////////////////////
    setShowAddForm,
  } = useContext(NewContext);

  //////Add-Func///////////////////////////////////////////////////////////////
  const addFunc = () => {
    if (!name.trim() || !describe.trim() || !day.trim() || !icon.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    handleSubmit();
    setShowAddForm(false);
    setName("");
    setDescribe("");
    setDay("");
    setIcon("");
    setColor("");
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-100 grid place-items-center backdrop-blur-[5px] ">
      <div className="w-110 h-125 shadow-[0_0_8px_0px_#ffffff]/25 bg-gray-950 rounded-md flex flex-col gap-3 px-7 py-7 items-center justify-start">
        <h2 className="text-2xl font-bold text-[#00ffe1]">Add New Habit</h2>
        <div className="w-full flex flex-col justify-between gap-3 ">
          <input
            type="text"
            placeholder="Habit Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full h-10 px-4 bg-[#0d141b] text-white rounded-[5px] outline-none focus:shadow-[0_0_5px_0px_#ffffff]/20"
          />

          <input
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescribe(e.target.value);
            }}
            className="w-full h-10 px-4 bg-[#0d141b] text-white rounded-[5px] outline-none focus:shadow-[0_0_5px_0px_#ffffff]/20"
          />
          <div className="w-full flex gap-5">
            <input
              type="number"
              placeholder="Target Days"
              onChange={(e) => {
                setDay(e.target.value);
              }}
              className="w-1/2 h-10 px-4 bg-[#0d141b] text-white rounded-[5px] outline-none focus:shadow-[0_0_5px_0px_#ffffff]/20"
            />
            <select
              onChange={(e) => {
                setIcon(e.target.value);
              }}
              className="w-1/2 bg-[#0d141b] rounded-[5px] outline-none px-4 focus:shadow-[0_0_5px_0px_#ffffff]/20"
            >
              <option defaultValue>Icons</option>
              <option value="🎯">🎯</option>
              <option value="📕">📕</option>
              <option value="📒">📒</option>
              <option value="📖">📖</option>
              <option value="💻">💻</option>
              <option value="✍🏻">✍🏻</option>
              <option value="🎨">🎨</option>
              <option value="💪🏻">💪🏻</option>
              <option value="🧘🏻">🧘🏻</option>
              <option value="🏃🏻‍➡️">🏃🏻‍➡️</option>
              <option value="😴">😴</option>
              <option value="🍎">🍎</option>
              <option value="💧">💧</option>
              <option value="💊">💊</option>
              <option value="⚽">⚽</option>
              <option value="🎮">🎮</option>
              <option value="💰">💰</option>
              <option value="🧹">🧹</option>
              <option value="🚿">🚿</option>
              <option value="🪥">🪥</option>
              <option value="🧼">🧼</option>
              <option value="🎵">🎵</option>
            </select>
          </div>
          <div className="w-full space-y-2">
            <div className="w-full flex bg-[#0d141b] rounded-[5px] px-3 pt-4 pb-6 flex-col gap-2 items-center justify-center">
              <h2 className="font-semibold w-full">Color</h2>
              <div className="w-full h-fit grid px-4 place-items-center grid-cols-4 gap-3">
                <button
                  className="h-9 w-19 rounded-md bg-linear-to-r from-purple-500 to-purple-900 focus:border"
                  onClick={() => {
                    setColor({
                      shadow: "shadow-[0_0_5px_0px_#9810fa]/60",
                      from: "from-purple-500",
                      to: "to-purple-900",
                      bg: "bg-purple-500",
                      iconColor: "text-amber-500",
                    });
                  }}
                ></button>
                <button
                  className="h-9 w-19 rounded-md bg-linear-to-r from-blue-500 to-blue-900 focus:border"
                  onClick={() => {
                    setColor({
                      shadow: "shadow-[0_0_5px_0px_#155dfc]/60",
                      from: "from-blue-500",
                      to: "to-blue-900",
                      bg: "bg-blue-500",
                      iconColor: "text-amber-500",
                    });
                  }}
                ></button>
                <button
                  className="h-9 w-19 rounded-md bg-linear-to-r from-green-500 to-green-900 focus:border"
                  onClick={() => {
                    setColor({
                      shadow: "shadow-[0_0_5px_0px_#00a63e]/60",
                      from: "from-green-500",
                      to: "to-green-900",
                      bg: "bg-green-500",
                      iconColor: "text-black",
                    });
                  }}
                ></button>
                <button
                  className="h-9 w-19 rounded-md bg-linear-to-r from-orange-500 to-orange-800 focus:border"
                  onClick={() => {
                    setColor({
                      shadow: "shadow-[0_0_5px_0px_#ff6900]/50",
                      from: "from-orange-500",
                      to: "to-orange-800",
                      bg: "bg-orange-500",
                      iconColor: "text-black",
                    });
                  }}
                ></button>
                <button
                  className="h-9 w-19 rounded-md bg-linear-to-r from-yellow-500 to-yellow-800 focus:border"
                  onClick={() => {
                    setColor({
                      shadow: "shadow-[0_0_5px_0px_#d08700]/60",
                      from: "from-yellow-500",
                      to: "to-yellow-800",
                      bg: "bg-yellow-500",
                      iconColor: "text-black",
                    });
                  }}
                ></button>
                <button
                  className="h-9 w-19 rounded-md bg-linear-to-r from-pink-500 to-pink-800 focus:border"
                  onClick={() => {
                    setColor({
                      shadow: "shadow-[0_0_5px_0px_#f6339a]/60",
                      from: "from-pink-500",
                      to: "to-pink-800",
                      bg: "bg-pink-500",
                      iconColor: "text-amber-500",
                    });
                  }}
                ></button>
                <button
                  className="h-9 w-19 rounded-md bg-linear-to-r from-indigo-500 to-indigo-900 focus:border"
                  onClick={() => {
                    setColor({
                      shadow: "shadow-[0_0_5px_0px_#4f39f6]/60",
                      from: "from-indigo-500",
                      to: "to-indigo-900",
                      bg: "bg-indigo-500",
                      iconColor: "text-amber-500",
                    });
                  }}
                ></button>
                <button
                  className="h-9 w-19 rounded-md bg-linear-to-r from-[#00ffe1] to-[#00c2ac] focus:border"
                  onClick={() => {
                    setColor({
                      shadow: "shadow-[0_0_5px_0px_#00ffe1]/50",
                      from: "from-[#00ffe1]",
                      to: "to-[#00c2ac]",
                      bg: "bg-[#00ffe1]",
                      color: "text-black",
                      iconColor: "text-amber-500",
                    });
                  }}
                ></button>
              </div>
            </div>
            <p className="w-full flex items-center justify-center text-red-500">
              {error}
            </p>
          </div>
        </div>
        <div className="space-x-4">
          <button
            onClick={addFunc}
            className="h-10 w-25 rounded-[5px] bg-[#00ffe1] cursor-pointer text-black shadow-[0_0_10px_0_#00ffbf]/60 transition-all duration-200 active:scale-95"
          >
            Add
          </button>
          <button
            className="h-10 w-25 rounded-[5px] bg-[#00ffe1] cursor-pointer text-black  shadow-[0_0_10px_0_#00ffbf]/60 transition-all duration-200 active:scale-95"
            onClick={() => {
              setShowAddForm(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHabit;
