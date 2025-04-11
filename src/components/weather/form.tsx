import { useState } from "react";

import { FormProps } from "./types";

function Form({ onSubmit }: FormProps) {
  const [enteredLocation, setEnteredLocation] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  function handleLocationChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setFormError("");
    setEnteredLocation(event.target.value);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFormError("");

    if (!enteredLocation) {
      setFormError("Please enter a location");
      return;
    }

    onSubmit(enteredLocation);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input 
        type="text" 
        placeholder="Enter a location" 
        value={enteredLocation} 
        onChange={handleLocationChange}
      />
      {formError && <p>{formError}</p>}
    </form>
  );
}

export default Form;