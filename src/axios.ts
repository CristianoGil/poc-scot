import axios, {AxiosRequestConfig} from 'axios'
import {AUTH_TOKEN} from "@/utils/const";


axios.interceptors.request.use(async (config: AxiosRequestConfig | any) => {
    config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`

    return config
})

export default axios
