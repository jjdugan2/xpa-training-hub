import axios, { AxiosRequestConfig } from "axios";

export const endpoint_siteContent = "https://xprepper.com/api/training-hub/request.php";
export const endpoint_youtube = "https://xprepper.com/api/training-hub/getYoutube.php";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results?: T[]; // Make results optional
    items?: T[]; // Make items optional
  }

const axiosInstance = axios.create({

});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  //-- Returns a generic array wrapped in a specific array, ie: <FetchResponse<T>>
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
    .get<FetchResponse<T>>(this.endpoint, config)
    .then((res) => res.data);
  }

  //-- Returns a generic array not wrapped in a specific array, ie: <T>
  get = (config: AxiosRequestConfig) => {
    return axiosInstance
    .get<T>(this.endpoint, config)
    .then((res) => res.data)
  }
}

export default APIClient;