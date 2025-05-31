import moment from "moment-jalaali";

export function formatJalali(dateIn: Date | string): string {
  return moment(dateIn).format("jYYYY/jMM/jDD HH:mm");
}
