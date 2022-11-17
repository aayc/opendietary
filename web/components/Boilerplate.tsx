import Head from "next/head";
import Nav from "./Nav";

type BoilerplateProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

export default function Boilerplate(props: BoilerplateProps) {
  return (
    <div className={props.className}>
      <Head>
        <title>Open Dietary | {props.title}</title>
        <meta name="description" content="An open source dietary planner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Nav></Nav>
        {props.children}
      </div>
    </div>
  );
}
