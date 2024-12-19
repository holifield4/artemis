import axios, { AxiosResponse } from "axios";

const http = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: 25000,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

http.interceptors.response.use(function(response: AxiosResponse){
  return response.data as AxiosResponse;
})  


export default http;