import {URL_API} from "@/utils/const";
import axios, {AxiosResponse} from "axios";
import {PersonRequest, PersonResponse, PersonResponseError} from "@/model/person";

export class Signature {
    protected url_api: string
    protected base64PDF: ArrayBuffer | string | null | undefined
    protected posx = 340
    protected posy = 385
    protected idcord = 0
    protected isreduzida = 1

    constructor(base64PDF: string | ArrayBuffer | null | undefined, url_sign?: string) {
        this.base64PDF = base64PDF;
        this.url_api = url_sign || URL_API
    }

    public sign(posx = this.posx, posy = this.posy, idcord = this.idcord, isreduzida = this.isreduzida): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.url_api}/LoadScot?Base64=${this.base64PDF}&posx=${posx}&posy=${posy}&idcord=${idcord}&isreduzida=${isreduzida}`)
                .then((response: AxiosResponse<any>) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

}
