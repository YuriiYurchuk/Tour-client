import { sendEmailSubscriber } from "../api/emailSubscriberApi";
import { toast } from "react-toastify";

export async function handleEmail(data) {
  try {
    const response = await sendEmailSubscriber(data);

    const message = response?.message || response?.data?.message;
    if (message) {
      toast.success(message);
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
