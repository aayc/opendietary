import moment from "moment";
import { useEffect, useState } from "react";
import { HistoryItem, JournalHistory } from "../shared/type_helper";
import Dropdown, { DropdownOption } from "../widgets/Dropdown";

type HistoryTableProps = {
  className?: string;
  history: JournalHistory;
};

export default function HistoryTable(props: HistoryTableProps) {
  const timeOptions = ["Today", "This week", "This month", "This year"].map((label) => ({ label, value: label }));
  const sortOptions = ["Time", "Calories", "Protein", "Carbs", "Fat"].map((label) => ({ label: "Sort by " + label.toLowerCase(), value: label.toLowerCase() }));
  const [computedHistory, setComputedHistory] = useState<JournalHistory>({});
  const [selectedTimeframe, setSelectedTimeframe] = useState<DropdownOption>({ label: "This week", value: "This week" });
  const [selectedSortOptions, setSelectedShortOptions] = useState<DropdownOption>({ label: "Sort by time", value: "time" });

  useEffect(() => {
    setComputedHistory(computeHistory(props.history));
  }, [props.history, selectedTimeframe, selectedSortOptions]);

  const computeHistory = (history: JournalHistory) => {
    const timeFrameToMomentComparator: any = {
      "Today": "day",
      "This week": "week",
      "This month": "month",
      "This year": "year",
    }
    const filterByTime = Object.keys(history).filter((key) => {
      return moment(history[key].date).isSame(moment(), timeFrameToMomentComparator[selectedTimeframe.value]);
    })
    
    const sortKeys = filterByTime.sort((a, b) => {
      if (selectedSortOptions.value == "No sorting") {
        return 0;
      } else if (selectedSortOptions.value == "time") {
        return moment(history[b].date).diff(moment(history[a].date));
      } else {
        const historyA = history[a]["nutrition"] as unknown as { [key: string]: number }
        const historyB = history[b]["nutrition"] as unknown as { [key: string]: number }
        const sortBy = selectedSortOptions.value;
        const historyAValue = historyA[sortBy] * history[a].quantity
        const historyBValue = historyB[sortBy] * history[b].quantity
        return historyBValue - historyAValue;
      }
    });

    return sortKeys.reduce((acc: any, key: string) => {
      acc[key] = history[key];
      return acc;
    }, {});
  };

  return (
    <div className={props.className}>
      <div className="flex">
        <Dropdown value={selectedTimeframe} options={timeOptions} onChange={(t) => setSelectedTimeframe(t)} placeholder="Select timeframe" />
        <Dropdown className="ml-4" value={selectedSortOptions} options={sortOptions} onChange={(t) => setSelectedShortOptions(t)} placeholder="Sort by" />
      </div>
      <table className="mt-4 w-full text-left border-separate border-spacing-4">
        <thead className="underline">
          <tr>
            <th>Date</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>Calories</th>
            <th>Carbs</th>
            <th>Fats</th>
            <th>Protein</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(computedHistory).map((key) => {
            const item = computedHistory[key];
            return (
              <tr key={key}>
                <td>{moment(item.date).format("MM/DD")}</td>
                <td>{item.nutrition.brandName + " " + item.nutrition.foodName}</td>
                <td>{item.quantity}</td>
                <td>{item.nutrition.calories * item.quantity}</td>
                <td>{item.nutrition.carbs * item.quantity}g</td>
                <td>{item.nutrition.fat * item.quantity}g</td>
                <td>{item.nutrition.protein * item.quantity}g</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
