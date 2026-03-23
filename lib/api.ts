import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL no está definido");
}

export const api = axios.create({
  baseURL: API_BASE.replace(/\/+$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});