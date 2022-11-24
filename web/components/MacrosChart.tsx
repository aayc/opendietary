import PieChart from "../widgets/PieChart";

type MacrosChartProps = {
  className?: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
};
export default function MacrosChart(props: MacrosChartProps) {
  return (
    <div className={props.className}>
      <div className="flex mt-6 mb-10 justify-between">
        <PieChart data={[props.carbs, props.fat, props.protein]} labels={["Carbs", "Fat", "Protein"]} />
        <div className="w-1/2">
          <p className="bg-black p-4 rounded-lg text-white font-bold my-2">Total calories: {props.calories}</p>
          <p className="bg-blue-500 p-4 rounded-lg text-white font-bold my-2">Total carbs: {props.carbs}g</p>
          <p className="bg-green-600 p-4 rounded-lg text-white font-bold my-2">Total fats: {props.fat}g</p>
          <p className="bg-amber-500 p-4 rounded-lg text-white font-bold my-2">Total protein: {props.protein}g</p>
        </div>
      </div>
    </div>
  );
}
