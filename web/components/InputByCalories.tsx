import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { Button } from "primereact/button";

type InputByCaloriesProps = {
  className?: string;
  onSubmit: (calories: number) => void;
};

export default function InputByCalories(props: InputByCaloriesProps) {
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const submit = () => {
    if (totalCalories) {
      props.onSubmit(totalCalories);
    }
  };

  return (
    <div className={props.className}>
      <div className="flex">
        <span className="input-h-label">Calories per day:</span>
        <input
          type="number"
          className="ml-2 number-input-gray"
          placeholder="Calories per day"
          value={totalCalories}
          onChange={(e) => setTotalCalories(parseInt(e.target.value))}
        />
      </div>
      <div className="mt-4">
        <button className="btn-primary" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}
