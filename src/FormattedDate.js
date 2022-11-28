export default function FormattedDate(props) {
  const options = {
    weekday: "long",
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  };
  const formattedDate = props.date.toLocaleDateString("en-EN", options);
  return formattedDate;
}
