import "./output.css";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
//////Pages////////////////////////////////////////////////////////////////////////////
import DoneHabitsPage from "./Components/DoneHabitsPage";
import Home from "./Components/Home";
export const NewContext = createContext()

function App() {
  //////Date///////////////////////////////////////////////////////////////////////////
  const today = new Date()
  const startDate = today.toLocaleDateString("en-CA")
  const fullDate = today.toISOString().split("T")[0]

  //////Input-States///////////////////////////////////////////////////////////////////
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  //////Input-States///////////////////////////////////////////////////////////////////
  const [name, setName] = useState("")
  const [describe, setDescribe] = useState("")
  const [day, setDay] = useState("")
  const [streak, setStreak] = useState("")
  const [status, setStatus] = useState("active")
  const [doneDays, setDoneDays] = useState([])
  const [icon, setIcon] = useState("")
  const [color, setColor] = useState({
    shadow: "shadow-[0_0_5px_0px_#00ffe1]/50",
    from: "from-[#00ffe1]",
    to: "to-[#00c2ac]",
    bg: "bg-[#00ffe1]",
    color: "text-black",
    iconColor: "text-amber-500",
  })
  //////Other////////////////////////////////////////////////////////////////////////
  const [habits, setHabits] = useState([]);
  const [elementId, setElementId] = useState("")

  return (
    <>
      <NewContext.Provider value={{
        //////Date//////////////////////////////////////////////////////////////////
        fullDate, startDate,
        //////show-form/////////////////////////////////////////////////////////////
        showAddForm, setShowAddForm,
        showDeleteForm, setShowDeleteForm,
        //////Input-States//////////////////////////////////////////////////////////
        name, setName,
        describe, setDescribe,
        day, setDay,
        doneDays, setDoneDays,
        color, setColor,
        icon, setIcon,
        status, streak,
        //////Other/////////////////////////////////////////////////////////////////
        elementId, setElementId,
        habits, setHabits,
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doneHabitPage" element={<DoneHabitsPage />} />
        </Routes>
      </NewContext.Provider>
    </>
  );
}

export default App;
