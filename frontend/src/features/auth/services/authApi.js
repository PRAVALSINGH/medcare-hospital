import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/patients";

export const registerPatient = async (patientData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    patientData
  );

  return response.data;
};

export const loginPatient = async (loginData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    loginData
  );

  return response.data;
};