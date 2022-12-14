import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import ParameterPlanningForm, {
  DietParameters,
} from "../components/ParameterPlanningForm";
import Nav from "../components/Nav";
import walkingAvocado from "../public/lottie/walking-avocado.json";
import Lottie from "lottie-react";
import PieChart from "../widgets/PieChart";
import LineChartDemo from "../widgets/LineChart";
import Boilerplate from "../components/Boilerplate";
import MacrosChart from "../components/MacrosChart";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const requestPlanForParameters = (parameters: DietParameters) => {
    if (!loading) {
      setLoading(true);
      setPlan(null);
      fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parameters),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          console.log(data);
          setPlan(data);
        });
    }
  };

  return (
    <Boilerplate title="Home" className="mb-24">
      <div className="card m-auto max-w-2xl rounded-lg shadow-lg p-8 mt-12">
        <h3 className="mt-2 mb-4">What kind of diet are you looking for?</h3>
        <ParameterPlanningForm
          onSubmit={requestPlanForParameters}
        ></ParameterPlanningForm>
      </div>

      {(loading || plan) && (
        <div className="card m-auto max-w-4xl rounded-lg shadow-lg p-8 mt-12">
          {loading && (
            <div className="flex justify-center">
              {/* <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              /> */}
              <div>
                <Lottie animationData={walkingAvocado} loop={true} />
                <p>Hang tight, we're building your customized plan...</p>
              </div>
            </div>
          )}
          {plan && (
            <div>
              <div className="flex justify-center mb-4">
                <h2>Today's plan</h2>
              </div>
              <h3>Your meals for today</h3>
              <p>Imagine some carousel with cards</p>
              <h3>Basic nutrition breakdown</h3>
              <MacrosChart
                calories={200}
                carbs={50}
                fat={20}
                protein={30}
              ></MacrosChart>

              <h3>Building on your trends</h3>
              <div className="mt-6 mb-10">
                <LineChartDemo></LineChartDemo>
              </div>
            </div>
          )}
        </div>
      )}
    </Boilerplate>
  );
}
