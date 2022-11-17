import { useState } from "react";
import { DietParameters } from "../shared/type_helper";

type ParameterPlanningFormProps = {
  className?: string;
  onSubmit: (parameters: DietParameters) => void;
};

export default function ParameterPlanningForm(props: ParameterPlanningFormProps) {
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [numMeals, setNumMeals] = useState(0);
  const [allowFastFood, setAllowFastFood] = useState(false);
  const [budget, setBudget] = useState(0);

  const allergyOptions = ["Gluten", "Dairy", "Eggs", "Nuts", "Soy", "Fish", "Shellfish"];

  const submit = () => {
    props.onSubmit({ protein, fat, carbs, allergies, numMeals, allowFastFood, budget });
  }

  return (
    <div className={props.className}>
      <div className="max-w-sm">
        <div className="flex justify-between">
          <span className="input-h-label">Carbs per day:</span>
          <input
            type="number"
            className="ml-2 number-input-gray"
            value={carbs}
            onChange={(e) => setCarbs(parseInt(e.target.value))}
          />
        </div>
        <div className="flex mt-1 justify-between">
          <span className="input-h-label">Fats per day:</span>
          <input
            type="number"
            className="ml-3 number-input-gray"
            value={fat}
            onChange={(e) => setFat(parseInt(e.target.value))}
          />
        </div>
        <div className="flex mt-1 justify-between">
          <span className="input-h-label">Protein per day:</span>
          <input
            type="number"
            className="ml-2 number-input-gray"
            value={protein}
            onChange={(e: any) => setProtein(parseInt(e.target.value))}
          />
        </div>
        <div className="flex mt-1 justify-between">
          <span className="input-h-label">Number of meals:</span>
          <input
            type="number"
            className="ml-2 number-input-gray"
            value={numMeals}
            onChange={(e: any) => setNumMeals(parseInt(e.target.value))}
          />
        </div>
        <div className="flex mt-1">
          <span className="input-h-label">Allow Fast Food</span>
          <input
            type="checkbox"
            className="ml-2 checkbox-lg"
            value={protein}
            onChange={(e: any) => setAllowFastFood(e.target.value)}
          />
        </div>
        <div className="flex mt-1 justify-between">
          <span className="input-h-label">Budget per day:</span>
          <input
            type="number"
            className="ml-2 number-input-gray"
            value={budget}
            onChange={(e: any) => setBudget(parseInt(e.target.value))}
          />
        </div>
        <div className="flex mt-1 justify-between">
          <span className="input-h-label">Allergies:</span>
          {allergyOptions.map((allergy) => (
            <div key={allergy} className="flex-wrap items-center">
              <input
                type="checkbox"
                className="ml-2 checkbox-lg"
                value={allergy}
                onChange={(e: any) => {
                  if (e.target.checked) {
                    setAllergies([...allergies, allergy]);
                  } else {
                    setAllergies(allergies.filter((a) => a !== allergy));
                  }
                }}
              />
              <span className="ml-1">{allergy}</span>
            </div>
          ))}
          </div>
      </div>
      <button className="mt-2 btn-primary" onClick={submit}>
        Create plan
      </button>
    </div>
  );
}

export type { DietParameters };
