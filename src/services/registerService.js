import { register } from "../api/authApi";
import { toast } from "react-toastify";

export async function handleRegister(data, onSuccess) {
  try {
    toast.info("Зачекайте, йде реєстрація...");
    const response = await register(data);

    if (response?.user) {
      toast.success("Реєстрація успішна!");
      onSuccess();
    } else {
      toast.error(
        response?.data?.message || "Щось пішло не так. Спробуйте ще раз."
      );
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Щось пішло не так. Перевірте ваші дані та спробуйте знову."
    );
  }
}
