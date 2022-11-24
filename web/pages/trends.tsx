import { ref } from "firebase/database";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObject } from "react-firebase-hooks/database";
import Boilerplate from "../components/Boilerplate";
import MacrosChart from "../components/MacrosChart";
import Nav from "../components/Nav";
import { JournalHistory } from "../shared/type_helper";
import { auth, db } from "../utils/firebase";
import Dropdown, { DropdownOption } from "../widgets/Dropdown";
import PieChart from "../widgets/PieChart";
import Spinner from "../widgets/Spinner";

export default function Trends() {
  const [user, loading, error] = useAuthState(auth);
  const [historyLoading, setHistoryLoading] = useState(true);
  const timeOptions = ["Today", "This week", "This month", "This year", "Range"].map((label) => ({ label: label, value: label }));
  const [computedHistory, setComputedHistory] = useState<JournalHistory>({});
  const [selectedTimeframe, setSelectedTimeframe] = useState<DropdownOption>({ label: "This week", value: "This week" });
  const [showRangeInput, setShowRangeInput] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({ start: new Date(), end: new Date() });
  const [historySnap, loadingHistory, errorHistory] = useObject(ref(db, "/history/" + user?.uid));
  const macros = ["carbs", "fat", "protein"];
  const router = useRouter();

  useEffect(() => {
    if (user && !error && !loading && historySnap) {
      setComputedHistory(computeHistory(historySnap?.val()));
      setHistoryLoading(false);
    }
  }, [historySnap, selectedTimeframe]);

  useEffect(() => {
    if (!user || error) {
      router.push("/login?to=trends");
    }
  }, [user, error]);

  const sumHistoryOverNutrient = (nutrient: string) => {
    return Object.keys(computedHistory).reduce((acc: number, key: string) => {
      return acc + ((computedHistory[key].nutrition as any)[nutrient] as number) * computedHistory[key].quantity;
    }, 0);
  };

  const computeHistory = (history: JournalHistory) => {
    const timeFrameToMomentComparator: any = {
      Today: "day",
      "This week": "week",
      "This month": "month",
      "This year": "year",
    };
    const filterByTime = Object.keys(history).filter((key) => {
      return moment(history[key].date).isSame(moment(), timeFrameToMomentComparator[selectedTimeframe.value]);
    });

    return filterByTime.reduce((acc: any, key: string) => {
      acc[key] = history[key];
      return acc;
    }, {});
  };

  return (
    <Boilerplate title="Trends">
      {!loading && user && (
        <div className="m-auto max-w-3xl p-8 mt-12">
          <h2>Your Trends</h2>
          <Dropdown className="mt-4" value={selectedTimeframe} options={timeOptions} onChange={(t) => setSelectedTimeframe(t)} placeholder="Select timeframe" />
          <h3 className="mt-4">From {moment().format("MMM DD")} to {moment().add(3, "days").format("MMM DD")}</h3>
          {historyLoading && (
            <div className="flex justify-center">
              <Spinner></Spinner>
            </div>
          )}
          {!historyLoading && computedHistory && (
            <div className="mt-8">
              <MacrosChart
                calories={sumHistoryOverNutrient("calories")}
                carbs={sumHistoryOverNutrient("carbs")}
                fat={sumHistoryOverNutrient("fat")}
                protein={sumHistoryOverNutrient("protein")}
              ></MacrosChart>
            </div>
          )}
        </div>
      )}
    </Boilerplate>
  );
}
