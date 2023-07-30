// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Data, ErrorResponse } from "@/constants/globaltypes";

const API_BASE_URL = "http://15.165.74.54:3000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const { pageNumber } = req.query;
    const response = await axios.get(`${API_BASE_URL}/?page=${pageNumber}`);
    res
      .status(200)
      .json({ data: response.data, message: "Data retrieved successfully" });
  } catch (error) {
    res.status(200).json({ message: "Something went wrong with the server" });
  }
}
