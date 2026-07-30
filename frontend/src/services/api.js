import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://smart-house-price-prediction-b143.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// House Price Prediction API
// ===============================

export const predictHousePrice = async (houseData) => {
  try {
    const response = await api.post("/predict", houseData);
    return response.data;
  } catch (error) {
    console.error("Prediction API Error:", error);

    if (error.response) {
      console.log("===== BACKEND VALIDATION ERROR =====");
      console.log(error.response.data);
      console.log("===================================");

      throw new Error(JSON.stringify(error.response.data, null, 2));
    }

    throw new Error("Unable to connect to the backend.");
  }
};

export default api;