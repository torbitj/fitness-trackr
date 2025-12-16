import { useActivity } from "./ActivityContext";

/** Form for a user to create a new activity with a name and description. */
export default function ActivityForm() {
  const { formError, tryCreateActivity } = useActivity();

  return (
    <>
      <h2>Add a new activity</h2>
      <form action={tryCreateActivity}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <button>Add activity</button>
      </form>
      {formError && <p role="alert">{formError}</p>}
    </>
  );
}
