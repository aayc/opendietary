import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { Avatar } from "primereact/avatar";
import { useState } from "react";

type NavProps = {
  hideLogin?: boolean;
};

export default function Nav(props: NavProps) {
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const hideLogin = props.hideLogin ?? false;
  const router = useRouter();

  const doSignOut = () => {
    if (!loading) {
      signOut(auth);
      router.push("/login");
    }
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  const getUserWidget = () => {
    if (hideLogin) {
      return <></>;
    } else if (user) {
      return (
        <div>
          <div
            className={`transition duration-200 ease-in-out hover:-translate-y-1 ${
              avatarDropdownOpen ? "-translate-y-1" : ""
            }`}
          >
            <Avatar
              icon={`transition duration-150 pi pi-user cursor-pointer`}
              className="mr-2"
              size="normal"
              shape="circle"
              onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
            />
          </div>
          {avatarDropdownOpen && (
            <div className="absolute right-0 mt-2 mr-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col">
                <p className="px-4 pt-3 pb-2 rounded-t-lg text-xs">
                  Signed in as {user.displayName}
                </p>
                <p className="dropdown-option pt-2 pb-2" onClick={goToProfile}>
                  Pantry
                </p>
                <p className="dropdown-option pt-2 pb-2" onClick={goToProfile}>
                  Preferences
                </p>
                <p
                  className="dropdown-option pb-3 pt-2 rounded-b-lg"
                  onClick={doSignOut}
                >
                  Log out
                </p>
              </div>
            </div>
          )}
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
