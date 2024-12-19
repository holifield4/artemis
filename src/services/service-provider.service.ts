import axios from "axios";

const http = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: 25000,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

http.interceptors.response.use(function(response){
  return response.data;
})  


export default http;