import {useAuth} from "../auth/AuthContext"

export default function ActivityList({ activities }) {
  const { token } = useAuth();
  return (
    <ul>
      {activities.map((activity) => (
        (!token)
          ? <li key={activity.id}>{activity.name}</li>
          : <li key={activity.id}>{activity.name} <button>Delete</button></li>
      ))}
    </ul>
  );
}
