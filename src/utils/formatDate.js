import { format } from "date-fns";
import { uk } from "date-fns/locale";

export const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd MMMM yyyy", { locale: uk });
};

export const formatMonthDay = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd.MM", { locale: uk });
};

export const formatMonthDayYear = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd.MM.yyyy", { locale: uk });
};

export const formatShortMonthDayYear = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd.MM.yy", { locale: uk });
};

export const formatDateComparison = (date1, date2) => {
  if (!date1 || !date2) return "";

  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);

  const year1 = date1Obj.getFullYear();
  const year2 = date2Obj.getFullYear();

  const formattedDate1 =
    year1 === year2
      ? format(date1Obj, "dd MMMM", { locale: uk })
      : format(date1Obj, "dd MMMM yyyy", { locale: uk });

  const formattedDate2 = format(date2Obj, "dd MMMM yyyy", { locale: uk });

  return `${formattedDate1} - ${formattedDate2}`;
};