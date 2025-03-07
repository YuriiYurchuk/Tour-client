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

