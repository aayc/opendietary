import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Boilerplate from "../components/Boilerplate";
import Nav from "../components/Nav";
import { auth } from "../utils/firebase";

export default function History() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user || error) {
      router.push("/login?to=history");
    }
  }, [user, error]);

  return (
    <Boilerplate title="History">
      {!loading && user && <div>Hello</div>}
    </Boilerplate>
  );
}
