import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex mt-8 px-8 justify-between">
      <div>
        <h1>Open Dietary</h1>
      </div>
      <div>
        <Link href="/login">
          <button className="btn-primary">Log in</button>
        </Link>
      </div>
    </div>
  );
}
