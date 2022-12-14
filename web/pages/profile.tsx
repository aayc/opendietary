import Head from "next/head";
import Nav from "../components/Nav";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObject } from "react-firebase-hooks/database";
import { ref, set } from "firebase/database";
import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "firebase/auth";
import Spinner from "../widgets/Spinner";
import Boilerplate from "../components/Boilerplate";

function ProfileInfoTab(props: { user: User }) {
  const [hasEdited, setHasEdited] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstNameSnap, loadingFirstName, errorFirstName] = useObject(
    ref(db, "/profiles/" + props.user.uid + "/firstName")
  );
  const [lastNameSnap, loadingLastName, errorLastName] = useObject(
    ref(db, "/profiles/" + props.user.uid + "/lastName")
  );

  const updateFirstName = (e: any) => {
    setFirstName(e.target.value);
    if (e.target.value == firstNameSnap?.val() && lastName == lastNameSnap?.val()) {
      setHasEdited(false);
    } else if (!hasEdited) {
      setHasEdited(true);
    }
  };

  const updateLastName = (e: any) => {
    setLastName(e.target.value);
    if (e.target.value == lastNameSnap?.val() && firstName == firstNameSnap?.val()) {
      setHasEdited(false);
    } else if (!hasEdited) {
      setHasEdited(true);
    }
  };

  const save = async () => {
    setLoading(true);
    await set(ref(db, "/profiles/" + props.user.uid), {
      firstName: firstName,
      lastName: lastName,
    });
    setLoading(false);
    setHasEdited(false);
  };

  useEffect(() => {
    if (firstNameSnap) {
      setFirstName(firstNameSnap.val());
    }
    if (lastNameSnap) {
      setLastName(lastNameSnap.val());
    }
  }, [firstNameSnap, lastNameSnap]);

  return (
    <div>
      <h2>Profile</h2>
      <div className="flex flex-col mt-8">
        <p className="input-h-label text-sm">First Name</p>
        <input
          type="text"
          className="text-input-gray"
          value={firstName}
          disabled={loading}
          onChange={updateFirstName}
        ></input>
      </div>
      <div className="flex flex-col mt-4">
        <p className="input-h-label text-sm">Last Name</p>
        <input
          type="text"
          className="text-input-gray"
          value={lastName}
          disabled={loading}
          onChange={updateLastName}
        ></input>
      </div>
      <div>
        <button
          className={`mt-8 ${hasEdited ? "btn-primary" : "btn-disabled"}`}
          disabled={!hasEdited}
          onClick={save}
        >
          {loading && <Spinner className="inline mr-2" size={15}></Spinner>}
          {!hasEdited ? "Up to date" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [user, loading, error] = useAuthState(auth);
  const [tab, setTab] = useState("profile");
  const router = useRouter();

  useEffect(() => {
    if (!user || error) {
      router.push("/login?to=profile");
    }
  }, [user, error]);

  const getTab = () => {
    if (tab == "profile") {
      return <ProfileInfoTab user={user!}></ProfileInfoTab>;
    } else if (tab == "account") {
      return (
        <div>
          <h2>Account</h2>
          <button className="btn-danger mt-8" onClick={deleteAccount}>
            Delete account
          </button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const deleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      user?.delete();
    }
  };

  return (
    <Boilerplate title="Profile">
      {!loading && user && (
        <div className="m-auto max-w-3xl p-8 mt-12">
          <div className="flex mt-8">
            <div className="w-56 h-64 card rounded-lg shadow-lg p-4 max-w-xl flex flex-col">
              <p
                className={`sidebar-option my-1 ${
                  tab == "profile" ? "font-semibold" : "hover:translate-x-1"
                }`}
                onClick={() => setTab("profile")}
              >
                Profile
              </p>
              <p
                className={`sidebar-option mt-2 mb-1 ${
                  tab == "account" ? "font-semibold" : "hover:translate-x-1"
                }`}
                onClick={() => setTab("account")}
              >
                Account
              </p>
            </div>
            <div className="ml-8 w-full">{getTab()}</div>
          </div>
        </div>
      )}
    </Boilerplate>
  );
}
