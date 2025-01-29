import { publicAxios } from "./axiosInstance";

const BaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getTopHotDeals = async () => {
  try {
    const response = await publicAxios.get("/hotel/top-hot-deals");
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні топ-10 гарячих турів:", error);
    throw error;
  }
};

export const getTop = async () => {
  try {
    const response = await publicAxios.get("/hotel/top-orders");
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні топ-10 гарячих турів:", error);
    throw error;
  }
};

export const getAllHotels = async ({
  page = 1,
  limit = 8,
  season = "",
  starRating = "",
  amenities = "",
  sortBy = "",
  sortOrder = "",
  country = "",
  mealType = "",
  priceFrom = "",
  priceTo = "",
}) => {
  try {
    const response = await publicAxios.get("/hotel/all", {
      params: {
        page,
        limit,
        season,
        starRating,
        amenities,
        sortBy,
        sortOrder,
        country,
        mealType,
        priceFrom,
        priceTo,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні списку готелів:", error);
    throw error;
  }
};

export const getAllHotelsHot = async ({
  page = 1,
  limit = 8,
  season = "",
  starRating = "",
  amenities = "",
  isHotDeal = true,
  sortBy = "",
  sortOrder = "",
  country = "",
  mealType = "",
  priceFrom = "",
  priceTo = "",
}) => {
  try {
    const response = await publicAxios.get("/hotel/hot", {
      params: {
        page,
        limit,
        season,
        starRating,
        amenities,
        isHotDeal,
        sortBy,
        sortOrder,
        country,
        mealType,
        priceFrom,
        priceTo,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні списку готелів:", error);
    throw error;
  }
};

export const getAllHotelsWithStreaming = (onHotelReceived, onCompleted) => {
  try {
    const eventSource = new EventSource(`${BaseUrl}/hotel/all-map`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.status === "starting") {
        // Зазначте, що процес завантаження почався, але без логування
      } else if (data.status === "completed") {
        onCompleted();
        eventSource.close();
      } else if (data.error) {
        eventSource.close();
      } else {
        onHotelReceived(data);
      }
    };

    eventSource.onerror = (event) => {
      console.error("Помилка SSE з'єднання", event);

      const readyState = event.target.readyState;
      if (readyState === EventSource.CLOSED) {
        console.error("З'єднання закрите сервером.");
      } else if (readyState === EventSource.CONNECTING) {
        console.error("З'єднання встановлюється.");
      } else {
        console.error("Невідома помилка SSE.");
      }

      eventSource.close();
    };

    return eventSource;
  } catch (error) {
    console.error("Помилка при підключенні до SSE:", error);
    throw error;
  }
};
