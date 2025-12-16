import { useAuth } from "../auth/AuthContext"
import { deleteActivity } from "../api/activities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState();

  const tryDeleteActivity = async (activity) => {
    setError(null);

    try {
      await deleteActivity(activity.id, token);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <ul>
      {activities.map((activity) =>
        !token ? (
          <li key={activity.id}>{activity.name}</li>
        ) : (
          <li key={activity.id}>
            {activity.name}{" "}
            <button
              className="delete"
              onClick={() => tryDeleteActivity(activity)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </li>
        )
      )}
      {error && <p role="alert">{error}</p>}
    </ul>
  );
}
