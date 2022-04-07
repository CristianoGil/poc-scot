import {Signature} from "./../api/Signature";


export default function signature(base64PDF: ArrayBuffer | string) {
    const signatureInstance: Signature = new Signature(base64PDF);

    const signPDF = (data: { posx: number | undefined; posy: number | undefined; idcord: number | undefined; isreduzida: number | undefined; }): Promise<any> => {
        return new Promise((resolve, reject) => {

            signatureInstance.sign(data?.posx, data?.posy, data?.idcord, data?.isreduzida).then((data) => {
                resolve(data)
            }).catch((error: any) => {
                reject(error)
            })

        })

    }

    return {getSignedPDF: signPDF}
}