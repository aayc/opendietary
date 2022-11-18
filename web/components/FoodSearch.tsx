import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Edit, MinusCircle, PlusCircle } from "lucide-react";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { useState } from "react";
import { JournalHistory } from "../shared/type_helper";
import { NutritionSearchResult, searchFood } from "../utils/nutritionix";
import SearchBar from "../widgets/SearchBar";
import Spinner from "../widgets/Spinner";

type FoodSearchProps = {
  history?: JournalHistory;
  className?: string;
  onAdd: (item: NutritionSearchResult, quantity: number, date: Date) => Promise<string | undefined>; // push key
  onUndo: (pushKey: string) => Promise<boolean>;
};

export default function FoodSearch(props: FoodSearchProps) {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<NutritionSearchResult[] | undefined | null>([]);
  const [initialSearched, setInitialSearched] = useState(false);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [added, setAdded] = useState<boolean[]>([]);
  const [undoTracking, setUndoTracking] = useState<{ [key: number]: string }>({});
  const [resultLimit, setResultLimit] = useState(10);
  const [resultsCollapsed, setResultsCollapsed] = useState(false);

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
      setAdded(results?.map(() => false) || []);
      setQuantities(results?.map(() => 1) || []);
      setSearchLoading(false);
      setInitialSearched(false);
      setSearchResults(results);
    }
  };

  const updateQuantity = (index: number, value: number) => {
    if (value >= 1 && !added[index]) {
      const newQuantities = [...quantities];
      newQuantities[index] = value;
      setQuantities(newQuantities);
    }
  };

  const addOrRemoveItem = async (index: number) => {
    setAddLoading(true);
    const newAdded = [...added];
    newAdded[index] = !newAdded[index];
    const item = searchResults![index];
    if (newAdded[index] && !addLoading) {
      const undoKey = await props.onAdd(item, quantities[index], date);
      if (undoKey) {
        const newUndoTracking = { ...undoTracking };
        newUndoTracking[index] = undoKey;
        setUndoTracking(newUndoTracking);
      }
    } else {
      const pushKeyToRemove = undoTracking[index];
      const success = await props.onUndo(pushKeyToRemove);
      if (success) {
        const newUndoTracking = { ...undoTracking };
        delete newUndoTracking[index];
        setUndoTracking(newUndoTracking);
      }
    }
    setAdded(newAdded);
    setAddLoading(false);
  };

  return (
    <div className={props.className}>
      <div>
        <SearchBar placeholder="Search any food.." disabled={searchLoading} enableBarcodeScanner={true} onSearch={onSearch}></SearchBar>
      </div>
      {searchLoading && (
        <div className="mt-8 flex justify-center">
          <Spinner className="inline mr-2" size={15}></Spinner>
        </div>
      )}
      {searchResults && !searchLoading && searchResults.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between">
            <div className="flex">
              <h3>Results ({searchResults.length})</h3>
              <ChevronUp
                className={`transition duration-200 delay-150 cursor-pointer mt-1 ml-2 ${resultsCollapsed ? "" : "rotate-180"}`}
                onClick={() => setResultsCollapsed(!resultsCollapsed)}
              ></ChevronUp>
            </div>
            <div className="relative">
              <div
                className={`transition duration-200 ease-in-out delay-150 cursor-pointer flex ${showCalendar ? "text-blue-500" : "hover:text-blue-500"}`}
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <p className="font-semibold">{moment(date).format("MMM D, YYYY")}</p> <Edit size={18} className="mt-1 ml-2"></Edit>
              </div>
              <AnimatePresence>
                {showCalendar && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ ease: "easeOut", duration: 0.15 }}
                    className="absolute right-0 mt-2 mr-4 bg-white rounded-lg shadow-lg"
                  >
                    <Calendar value={date} onChange={(e: any) => setDate(e.value)} inline />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {!resultsCollapsed &&
            searchResults.slice(0, resultLimit).map((result, index) => (
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
                    <div className="w-2 flex justify-center">{quantities[index]}</div>
                    <PlusCircle size={18} className="clickable-icon mt-1 mx-2" onClick={() => updateQuantity(index, quantities[index] + 1)}></PlusCircle>
                  </div>
                  <button className={`h-12 ${added[index] ? "btn-danger" : "btn-primary"}`} onClick={() => addOrRemoveItem(index)}>
                    {added[index] ? "Undo" : "Add"}
                  </button>
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
      {(searchResults === null || searchResults?.length == 0) && initialSearched && !searchLoading && (
        <div className="mt-8 flex justify-center">
          <p>No results found.</p>
        </div>
      )}
    </div>
  );
}
