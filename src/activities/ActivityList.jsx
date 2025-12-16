import { useActivity } from "./ActivityContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function ActivityList() {
  const { token, activities, listError, tryDeleteActivity } = useActivity();

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
      {listError && <p role="alert">{listError}</p>}
    </ul>
  );
}
