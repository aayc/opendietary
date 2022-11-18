import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { PlusCircle, MinusCircle, ChevronUp, ChevronDown } from "lucide-react";
import Boilerplate from "../components/Boilerplate";
import { auth } from "../utils/firebase";
import { NutritionItemResult, NutritionSearchResult, searchFood } from "../utils/nutritionix";
import SearchBar from "../widgets/SearchBar";
import Spinner from "../widgets/Spinner";

export default function Pantry() {
  const [user, loading, error] = useAuthState(auth);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<NutritionSearchResult[] | undefined | null>([]);
  const [initialSearched, setInitialSearched] = useState(false);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [history, setHistory] = useState<NutritionItemResult[] | null>([]);
  const [resultLimit, setResultLimit] = useState(10);
  const [resultsCollapsed, setResultsCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user || error) {
      router.push("/login?to=journal");
    } else if (user) {
      // Download the entire history of the person from rtdbq
    }
  }, [user, error]);

  const onSearch = async (query: string) => {
    if (query.length > 0) {
      setSearchLoading(true);
      setResultLimit(10);
      const results = await searchFood(query);
      results?.sort((a, b) => {
        if (a.brandId && !b.brandId) {
          return -1;
        } else if (!a.brandId && b.brandId) {
          return 1;
        } else {
          return 0;
        }
      });
      setQuantities(results?.map(() => 1) || []);
      setSearchLoading(false);
      setInitialSearched(false);
      setSearchResults(results);
    }
  };

  const updateQuantity = (index: number, value: number) => {
    alert("update")
    if (value >= 1) {
      const newQuantities = [...quantities];
      newQuantities[index] = value;
      alert("update");
      setQuantities(newQuantities);
    }
  };

  return (
    <Boilerplate title="Journal">
      {!loading && user && (
        <div className="m-auto max-w-3xl p-8 mt-12">
          <h2>Journal</h2>
          <div className="mt-4">
            <SearchBar placeholder="Search any food.." disabled={searchLoading} enableBarcodeScanner={true} onSearch={onSearch}></SearchBar>
          </div>
          {searchLoading && (
            <div className="mt-8 flex justify-center">
              <Spinner className="inline mr-2" size={15}></Spinner>
            </div>
          )}
          {searchResults && !searchLoading && searchResults.length > 0 && (
            <div className="mt-4">
              <div className="flex">
                <h3>Results ({searchResults.length})</h3>
                <ChevronUp className={`transition duration-200 mt-1 ml-2 ${resultsCollapsed ? '' : 'rotate-180'}`} onClick={() => setResultsCollapsed(!resultsCollapsed)}></ChevronUp>
              </div>
              {!resultsCollapsed && searchResults.slice(0, resultLimit).map((result, index) => (
                <div className="my-6 flex justify-between">
                  <div className="flex">
                    <img src={result.photo.thumb} style={{ maxWidth: 100, maxHeight: 100 }}></img>
                    <div className="max-w-sm">
                      <p className="mx-4">{result.fullName || result.foodName}</p>
                      <p className="mt-2 mx-4 text-gray-500 text-sm">Added last week</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mx-4 mt-2 flex">
                      <MinusCircle
                        size={18}
                        className="clickable-icon mt-1 mx-2"
                        color={quantities[index] <= 1 ? "gray" : "black"}
                        onClick={() => updateQuantity(index, quantities[index] - 1)}
                      ></MinusCircle>
                      {quantities[index]}
                      <span onClick={() => updateQuantity(index, quantities[index] - 1)}>
                        <PlusCircle size={18} className="clickable-icon mt-1 mx-2"></PlusCircle>
                      </span>
                    </div>
                    {/* TODO make this a dropdown button so you can go back in time */}
                    <button className="btn-primary h-12">Add {quantities[index]}</button>
                  </div>
                </div>
              ))}
              {!resultsCollapsed && searchResults.length > resultLimit && (
                <div className="mt-2 flex justify-center w-full">
                  <p className="link-text" onClick={() => setResultLimit(resultLimit + 10)}>
                    Show more
                  </p>
                </div>
              )}
            </div>
          )}
          {searchResults === undefined && !searchLoading && (
            <div className="mt-4 flex justify-center">
              <p>API Error</p>
            </div>
          )}
          {(searchResults === null || searchResults?.length == 0) && !initialSearched && !searchLoading && (
            <div className="mt-8 flex justify-center">
              <p>No results found.</p>
            </div>
          )}
          <div className="mt-8">
            <h3>History</h3>
          </div>
        </div>
      )}
    </Boilerplate>
  );
}
