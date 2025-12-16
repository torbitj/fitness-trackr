import { useAuth } from "../auth/AuthContext"
import { deleteActivity } from "../api/activities";
import { useState } from "react";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState();
  return (
    <ul>
      {activities.map((activity) => (
        (!token)
          ? <li key={activity.id}>{activity.name}</li>
          : <li key={activity.id}>{activity.name} <button onClick={ async () => {
            try {
              await deleteActivity(activity.id, token)
              syncActivities()
            } catch (e) {
              setError(e.message)
            }
          }}>Delete</button></li>
      ))}
      {error && <p role="alert">{error}</p>}
    </ul>
  );
}
