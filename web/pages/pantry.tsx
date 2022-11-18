import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Boilerplate from "../components/Boilerplate";
import { auth } from "../utils/firebase";
import PieChartDemo from "../widgets/PieChart";
import SearchBar from "../widgets/SearchBar";

export default function Pantry() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  // Download the entire history of the person from rtdb
  //

  useEffect(() => {
    if (!user || error) {
      router.push("/login?to=pantry");
    }
  }, [user, error]);

  const onSearch = (query: string) => {
    console.log(query);
  };

  return (
    <Boilerplate title="Trends">
      {!loading && user && (
        <div className="m-auto max-w-5xl p-8 mt-12">
          <h2>Your Pantry</h2>
          <div className="mt-8">
            <h3>Summary</h3>
            <div className="flex w-3/4">
            <PieChartDemo></PieChartDemo>
</div>
          </div>
          <div className="mt-8">
            <h3>Ingredients</h3>
            <p>Ingredients go here</p>
          </div>
          <div className="mt-8">
            <h3>Meals & Leftovers</h3>
            <p>Ingredients go here</p>
          </div>
        </div>
      )}
    </Boilerplate>
  );
}
