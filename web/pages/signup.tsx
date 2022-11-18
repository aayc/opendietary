import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Boilerplate from "../components/Boilerplate";
import Nav from "../components/Nav";
import { auth, updateUserProfile } from "../utils/firebase";
import Spinner from "../widgets/Spinner";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const signUp = async () => {
    if (email == "" || password == "" || confirmPassword == "") {
      alert("Please enter your email and password");
    } else if (password != confirmPassword) {
      alert("Passwords do not match");
    } else if (!loading) {
      await createUserWithEmailAndPassword(email, password);
    }
  };

  const signUpIfPressEnter = (e: any) => {
    if (e.key == "Enter") {
      signUp();
    }
  };

  useEffect(() => {
    if (user) {
      updateUserProfile({ firstName, lastName }).then(() => {
        router.push("/");
      });
    }
    if (error) {
      alert("Error signing up: " + error.message);
    }
  });

  return (
    <Boilerplate title="Sign Up">
      <div className="card m-auto max-w-lg rounded-lg shadow-lg p-8 mt-12">
        <div className="flex justify-center">
          <div>
            <h2>Sign up for a free account</h2>
            <p className="text-center text-gray-600 mt-2">Open Dietary is free and always will be.</p>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <div className="mt-4 m-auto">
            <input type="text" className="text-input-gray" value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}></input>
            <br />
            <input type="text" className="my-2 text-input-gray" value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}></input>
            <br />
            <input type="text" className="my-2 text-input-gray" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <br />
            <input type="password" className="my-2 text-input-gray" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <br />
            <input type="password" className="my-2 text-input-gray" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={signUpIfPressEnter}></input>
          </div>
          <button className="btn-primary mt-4" onClick={signUp}>
            {loading && <Spinner className="inline mr-2" size={15}></Spinner>}
            Sign up
          </button>
          <Link href="/login">
            <p className="link-text mt-4 text-sm text-center">Have an account already? Sign in here.</p>
          </Link>
        </div>
      </div>
    </Boilerplate>
  );
}
