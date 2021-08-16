import classes from "../../styles/Home.module.css";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function Card({ children }: Props) {
  return <div className={classes.card}>{children}</div>;
}
