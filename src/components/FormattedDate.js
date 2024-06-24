import { format, parseISO } from "date-fns";

export default function FormattedDate(props) {
  // Parse the date string into a Date object
  const date = parseISO(props.date);

  // Format the date into the desired format
  const formattedDate = format(date, "EEEE HH:mm");
  return formattedDate;
}
