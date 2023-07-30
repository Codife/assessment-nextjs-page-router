import { Data, ErrorResponse } from "@/constants/globaltypes";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchPage = async (pageNumber: number) => {
  const response = await axios.get<Data>(
    `${API_BASE_URL}/?pageNumber=${pageNumber}`
  );
  return response.data;
};
