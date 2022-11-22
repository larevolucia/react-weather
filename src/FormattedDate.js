import React from "react";

export default function FormattedDate(props) {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  };
  const formattedDate = props.date.toLocaleDateString("en-EN", options);
  return formattedDate;
}
