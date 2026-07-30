import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
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