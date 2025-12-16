import { useEffect, useState, createContext, useContext } from "react";
import { getActivities, deleteActivity, createActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [listError, setListError] = useState('')
  const [formError, setFormError] = useState('');

  const syncActivities = async () => {
    const data = await getActivities();
    setListError('');
    setFormError('');
    setActivities(data);
  };

  const tryCreateActivity = async (formData) => {
    setFormError(null);

    const name = formData.get("name");
    const description = formData.get("description");

    try {
      await createActivity(token, { name, description });
      syncActivities();
    } catch (e) {
      setFormError(e.message);
    }
  };

  const tryDeleteActivity = async (activity) => {
    setListError(null);

    try {
      await deleteActivity(activity.id, token);
      syncActivities();
    } catch (e) {
      setListError(e.message);
    }
  }

  useEffect(() => {
    syncActivities();
  }, []);

  const value = { activities, listError, formError, token, setActivities, syncActivities, tryCreateActivity, tryDeleteActivity }
  
  return <ActivityContext.Provider value={value} >{children}</ActivityContext.Provider>
}

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("Must be able to use Activity Provider")
  }
  return context;
}