export default function FormattedDay(props) {
  let newDay = new Date(props.day * 1000);
  const options = {
    weekday: "short"
  };
  const formattedDate = newDay.toLocaleDateString("en-EN", options);
  return formattedDate;
}
