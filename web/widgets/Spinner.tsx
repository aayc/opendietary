import { ProgressSpinner } from "primereact/progressspinner";

type SpinnerProps = {
    className?: string;
  size?: number;
  strokeWidth?: number;
};

export default function Spinner(props: SpinnerProps) {
  return (
    <div className={props.className}>
    <ProgressSpinner
      style={{
        width: (props.size ?? 50) + "px",
        height: (props.size ?? 50) + "px",
      }}
      strokeWidth={"" + (props.strokeWidth ?? 8)}
      animationDuration=".5s"
    /></div>
  );
}
