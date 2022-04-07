import {URL_API_SCOT_SIGNATURE} from "./../utils/const";
import {AxiosResponse} from "axios";
import {ResponseError, ResponseSignature} from "./../model/signature";
import axios from "./../axios";

export class Signature {
    protected url_api: string
    protected base64PDF: ArrayBuffer | string | null | undefined
    protected posx = 340
    protected posy = 385
    protected idcord = 0
    protected isreduzida = 1

    constructor(base64PDF: string | ArrayBuffer | null | undefined) {
        this.base64PDF = base64PDF;
        this.url_api = URL_API_SCOT_SIGNATURE
    }

    public sign(posx = this.posx, posy = this.posy, idcord = this.idcord, isreduzida = this.isreduzida): Promise<ResponseSignature | ResponseError> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.url_api}?base64=${this.base64PDF}&posx=${posx}&posy=${posy}&idcord=${idcord}&isreduzida=${isreduzida}`)
                .then((response: AxiosResponse<any>) => {
                    resolve(response.data as unknown as ResponseSignature)
                })
                .catch((error) => {
                    reject(error as unknown as ResponseError)
                })
        })
    }

}
