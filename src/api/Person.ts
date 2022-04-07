import {URL_API_SCOT} from "@/utils/const";
import {PersonRequest, PersonResponse, PersonResponseError} from "@/model/person";
import axios, {AxiosResponse} from "axios";

export class Person {
    protected url_api: string

    constructor() {
        this.url_api = URL_API_SCOT
    }

    public getByNIF(requestPerson: PersonRequest): Promise<PersonResponse | PersonResponseError> {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.url_api}`, {requestPerson})
                .then((response: AxiosResponse<any>) => {
                    resolve(response.data as PersonResponse)
                })
                .catch((error) => {
                    reject(error as PersonResponseError)
                })
        })
    }
}
