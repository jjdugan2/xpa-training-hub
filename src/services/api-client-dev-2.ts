import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://xprepper.com/api/training-hub'
});

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => {
        return axiosInstance
            .get<T[]>(this.endpoint, {
                params: {
                    verb: "get",
                    component: "topics_main",
                    wrap: false,
                  }
            })
            .then(res => res.data);
    }

    post = (data: T) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then(res => res.data);
    }
}

export default APIClient;