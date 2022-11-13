import { useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

type Macros = {
  protein: number;
  fat: number;
  carbs: number;
};

type InputByMacrosProps = {
  className?: string;
  onSubmit: (macros: Macros) => void;
};

export default function InputByMacros(props: InputByMacrosProps) {
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);

  const submit = () => {
    if (protein && fat && carbs) {
      props.onSubmit({ protein, fat, carbs });
    }
  };

  return (
    <div className={props.className}>
      <div className="max-w-sm">
        <div className="flex justify-between">
          <span className="input-h-label">Carbs per day:</span>
          <input
            type="number"
            className="ml-2 number-input-gray"
            value={carbs + "g"}
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
            value={protein + "g"}
            onChange={(e: any) => setProtein(parseInt(e.target.value))}
          />
        </div>
      </div>
      <button className="mt-2 btn-primary" onClick={submit}>
        Submit
      </button>
    </div>
  );
}

export type { Macros };
