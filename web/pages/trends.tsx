import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Boilerplate from "../components/Boilerplate";
import Nav from "../components/Nav";
import { auth } from "../utils/firebase";

export default function Trends() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user || error) {
      router.push("/login?to=trends");
    }
  }, [user, error]);

  return (
    <Boilerplate title="Trends">
      {!loading && user && (
        <div className="m-auto max-w-3xl p-8 mt-12">
          <h2>Your Trends</h2>
          <p className="mt-2">This week👇</p>
        </div>
      )}
    </Boilerplate>
  );
}
