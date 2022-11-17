import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { useRouter } from "next/router";
import { signOut, User } from "firebase/auth";
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import { useObject } from "react-firebase-hooks/database";
import { ref, get } from "firebase/database";
import Spinner from "../widgets/Spinner";
import { motion, AnimatePresence } from "framer-motion";

type NavProps = {
  hideLogin?: boolean;
};

export default function Nav(props: NavProps) {
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [firstName, setFirstName] = useState("");
  const hideLogin = props.hideLogin ?? false;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      get(ref(db, "/profiles/" + user.uid + "/firstName"))
        .then((snap) => {
          setFirstName(snap.val());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  const doSignOut = () => {
    if (!loading) {
      signOut(auth);
      router.push("/login");
    }
  };

  const goTo = (loc: string) => {
    router.push("/" + loc);
  };

  const getUserWidget = () => {
    if (hideLogin) {
      return <></>;
    } else if (user) {
      return (
        <div>
          <div className={`transition duration-200 ease-in-out hover:-translate-y-1 ${avatarDropdownOpen ? "-translate-y-1" : ""}`}>
            <Avatar icon={`transition duration-150 pi pi-user cursor-pointer`} className="mr-2" size="normal" shape="circle" onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)} />
          </div>
          <AnimatePresence>
            {avatarDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ ease: "easeOut", duration: 0.15 }}
                className="absolute right-0 mt-2 mr-4 bg-white rounded-lg shadow-lg"
              >
                <div className="flex flex-col">
                  <p className="px-4 pt-3 pb-2 rounded-t-lg text-xs">Signed in as {firstName}</p>
                  <p className="dropdown-option pt-2 pb-2" onClick={() => goTo("trends")}>
                    Trends
                  </p>
                  <p className="dropdown-option pt-2 pb-2" onClick={() => goTo("pantry")}>
                    Pantry
                  </p>
                  <p className="dropdown-option pt-2 pb-2" onClick={() => goTo("profile")}>
                    Profile
                  </p>
                  <p className="dropdown-option pb-3 pt-2 rounded-b-lg" onClick={doSignOut}>
                    Log out
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    } else if (loading) {
      return <p>loading...</p>;
    } else {
      return (
        <Link href="/login">
          <button className="btn-primary">Log in</button>
        </Link>
      );
    }
  };

  return (
    <div className="flex mt-8 px-8 justify-between">
      <div>
        <Link href="/">
          <h2>Open Dietary</h2>
        </Link>
      </div>
      <div>{getUserWidget()}</div>
    </div>
  );
}
