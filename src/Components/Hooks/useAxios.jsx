import axios from "axios";
import { useEffect, useContext } from "react";
import { NewContext } from "../../App";

function useAxios() {
  const {
    //////Input-States///////////////////////////////////////////////////////////////////
    name,
    describe,
    day,
    color,
    icon,
    startDate,
    doneDays,
    streak,
    status,
    //////Other//////////////////////////////////////////////////////////////////////////
    habits,
    setHabits,
    elementId,
  } = useContext(NewContext);

  //////////GET///////////////////////////////////////////////////////////////////////////
  const handleGet = async () => {
    await axios.get("http://localhost:3006/Habit").then((response) => {
      setHabits(response.data);
    });
  };

  useEffect(() => {
    handleGet();
  }, []);

  //////////POST//////////////////////////////////////////////////////////////////////////
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3006/Habit", {
        name,
        describe,
        day,
        status,
        streak,
        startDate,
        doneDays,
        icon,
        color,
      });
      await handleGet();
    } catch (error) {
      alert(error.message);
    }
  };

  //////////DELETE/////////////////////////////////////////////////////////////////////////
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3006/Habit/${elementId}`);
      await handleGet();
    } catch (error) {
      alert(error.message);
    }
  };

  //////////Active-&-completed-Habits-list//////////////////////////////////////////////////
  const activeHabits = habits.filter((habit) => habit.status === "active");
  const completedHabits = habits.filter((habit) => habit.status === "completed");

  return {
    //////////Axios/////////////////////////////////////////////////////////////////////////
    handleSubmit,
    handleDelete,
    handleGet,
    //////////Habit-list/////////////////////////////////////////////////////////////////////
    habits,
    activeHabits,
    completedHabits,
  };
}

export default useAxios;
