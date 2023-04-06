import axios from "axios";
import { API_BASE } from "../constants";

// static values of axios
export const instance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
