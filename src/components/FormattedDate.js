export default function FormattedDate(props) {
  let newDate = new Date(props.date * 1000);
  const options = {
    weekday: "long",
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  };
  const formattedDate = newDate.toLocaleDateString("en-EN", options);
  return formattedDate;
}
