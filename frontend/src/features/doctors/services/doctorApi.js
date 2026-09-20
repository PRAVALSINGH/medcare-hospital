import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/doctors";

export const getAllDoctors = async () => {
  const response = await axios.get(`${API_URL}/list`);

  return response.data;
};