import axios, {AxiosRequestConfig} from 'axios'
import {AUTH_TOKEN, AXIOS_TIMEOUT} from "@/utils/const";


axios.interceptors.request.use(async (config: AxiosRequestConfig | any) => {
    if(config.method === "post"){  // this is  super danger, must be changed
        config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
    }
    return config
})

axios.defaults.timeout = AXIOS_TIMEOUT;
export default axios
