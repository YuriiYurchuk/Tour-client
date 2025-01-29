import { sendContactForm } from "../api/contactApi";
import { toast } from "react-toastify";

export async function handleContact(data, onSuccess) {
  try {
    const response = await sendContactForm(data);

    const message = response?.message || response?.data?.message;
    if (message) {
      toast.success(message);
      onSuccess();
    } else {
      toast.error("Щось пішло не так. Спробуйте ще раз.");
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Щось пішло не так. Перевірте ваші дані та спробуйте знову.";

    toast.error(errorMessage);
  }
}
