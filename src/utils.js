// Some util methods to convert between pace strings in format "mm:ss" and decimal numbers

//From float to string
export default function parsePaceNumber(pacenumber) {
  let minutes = Math.trunc(pacenumber);
  let seconds = Math.round((pacenumber % 1) * 60);
  let secondString =
    seconds <= 10 ? "0".concat(seconds.toString()) : seconds.toString();
  return minutes.toString().concat(":").concat(secondString);
}

//from string to float
export function parsePaceString(pacestring) {
  let pacestring_arr = pacestring.split(":");
  let integer_part = parseFloat(pacestring_arr[0]);
  let fractional_part = parseFloat(pacestring_arr[1].replace(/^0+/, "")) / 60;
  return round(integer_part + fractional_part, 2);
}

function round(value, decimals) {
  let val = Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  return val;
}
