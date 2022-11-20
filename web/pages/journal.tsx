import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Boilerplate from "../components/Boilerplate";
import { Toast } from "primereact/toast";
import { auth, db, getPushKey, tryAddHistoryItem, tryRemoveHistoryItem } from "../utils/firebase";
import { NutritionSearchResult } from "../utils/nutritionix";
import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { JournalHistory } from "../shared/type_helper";
import FoodSearch from "../components/FoodSearch";
import HistoryTable from "../components/HistoryTable";

export default function Journal() {
  const toast = useRef<any>(null);
  const [user, loading, error] = useAuthState(auth);
  const [historySnap, loadingHistory, errorHistory] = useObject(
    ref(db, "/history/" + user?.uid)
  );
  const [history, setHistory] = useState<JournalHistory>({});
  const router = useRouter();

  useEffect(() => {
    if (!user || error) {
      router.push("/login?to=journal");
    } 
  }, [user, error]);

  useEffect(() => {
    if (historySnap) {
      setHistory(historySnap.val());
    }
  }, [historySnap]);

  const addItemToHistory = async (item: NutritionSearchResult, quantity: number, date: Date) => {
    try {
      const fullFoodName = item.fullName || item.foodName;
      const pushKey = getPushKey("history/" + user?.uid)!;
      if (!pushKey) {
            throw new Error("Could not generate push key");
      }

      const response = await tryAddHistoryItem(user!.uid, pushKey, date, item.itemId!, quantity);
        if (!response) {
          throw new Error("Could not add history item");
        }
          toast?.current?.show({ severity: "success", summary: `Added ${quantity} ${fullFoodName}`, detail: "", life: 3000 });
          return pushKey;
        } catch (err) {
          toast?.current?.show({ severity: "error", summary: `Uh oh!`, detail: "How embarrassing! We found an error, please try again later.", life: 3000 });
          return undefined
        }
    }

  const removeItemFromHistory = async (pushKey: string) => {
    try {
      const response = await tryRemoveHistoryItem(user!.uid, pushKey);
      if (!response) {
        throw new Error("Could not remove history item");
      }
      toast?.current?.show({ severity: "success", summary: `Undone`, detail: "", life: 3000 });
      return true;
    } catch (err) {
      toast?.current?.show({ severity: "error", summary: `Uh oh!`, detail: "How embarrassing! We found an error, please try again later.", life: 3000 });
      return false;
    }
  }

  return (
    <Boilerplate title="Journal">
      <Toast ref={toast} position="bottom-left" />
      {!loading && user && (
        <div className="m-auto max-w-3xl p-8 mt-12">
          <h2>Journal</h2>
          <FoodSearch className="mt-4" onAdd={addItemToHistory}  onUndo={removeItemFromHistory}></FoodSearch>
          <div className="mt-8">
            <h3>Your History</h3>
            <HistoryTable className="mt-6" history={history} />
          </div>
        </div>
      )}
    </Boilerplate>
  );
}
