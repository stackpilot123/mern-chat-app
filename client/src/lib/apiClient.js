// this file is wrapper for axios 
import axios from "axios";
import { HOST } from "../utils/constants";

export const apiClient = axios.create({
    baseURL: HOST,
})
